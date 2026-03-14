from fastapi import APIRouter, HTTPException, Header
from schemas import PlanCreate, CheckoutRequest
from database import db_insert, db_select, db_update
from datetime import date, timedelta
import uuid

router = APIRouter(prefix="/checkout", tags=["Vendas & Pagamentos"])

# --- PLANOS ---

@router.get("/plans", summary="Listar planos ativos do tenant")
async def get_plans(tenant_id: str = Header(..., alias="X-Tenant-Id")):
    return await db_select("plans", {"tenant_id": f"eq.{tenant_id}", "active": "is.true"})

@router.post("/plans", summary="Criar novo plano")
async def create_plan(payload: PlanCreate):
    return await db_insert("plans", payload.dict())

# --- ASSINATURAS E RENOVAÇÕES ---

@router.post("/subscribe", summary="Gerar assinatura e fatura (Checkout API)")
async def create_subscription(payload: CheckoutRequest):
    # 1. Pega dados do plano
    plan_data = await db_select("plans", {"id": f"eq.{payload.plan_id}"})
    if not plan_data:
        raise HTTPException(status_code=404, detail="Plano não encontrado")
    
    plan = plan_data[0]
    
    # 2. Cria Assinatura
    sub_id = str(uuid.uuid4())
    start_date = date.today()
    end_date = start_date + timedelta(days=plan.get("duration_days", 30))
    
    subscription = {
        "id": sub_id,
        "tenant_id": payload.tenant_id,
        "student_id": payload.student_id,
        "plan_id": payload.plan_id,
        "status": "active",
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "payment_method": payload.payment_method
    }
    await db_insert("subscriptions", subscription)
    
    # 3. Gera Fatura vinculada
    invoice = {
        "subscription_id": sub_id,
        "tenant_id": payload.tenant_id,
        "amount": plan["price"],
        "due_date": start_date.isoformat(), # Vence hoje
        "status": "pending",
        "payment_method": payload.payment_method
    }
    
    inv_res = await db_insert("invoices", invoice)
    invoice_id = inv_res[0]["id"] if inv_res else None
    
    return {
        "message": "Assinatura gerada com sucesso",
        "subscription_id": sub_id,
        "invoice_id": invoice_id,
        "amount": plan["price"]
    }

# --- FATURAS ---
@router.get("/invoices", summary="Listar faturas do tenant")
async def get_invoices(tenant_id: str = Header(..., alias="X-Tenant-Id"), status: Optional[str] = None):
    params = {"tenant_id": f"eq.{tenant_id}", "order": "due_date.desc"}
    if status:
        params["status"] = f"eq.{status}"
    return await db_select("invoices", params)
