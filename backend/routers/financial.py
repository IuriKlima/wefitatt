from fastapi import APIRouter, HTTPException
from database import db_select, db_insert, db_update, db_delete
from schemas import (PlanCreate, SubscriptionCreate, InvoiceCreate,
                     CashRegisterOpen, CashRegisterTransaction, PixChargeCreate, DelinquencyRuleCreate)
from datetime import datetime

router = APIRouter(prefix="/financial", tags=["Módulo 1 — Financeiro"])

# --- PLANOS ---
@router.get("/plans", summary="Listar planos da academia")
async def list_plans(tenant_id: str):
    return await db_select("plans", {"tenant_id": f"eq.{tenant_id}"})

@router.post("/plans", summary="Criar novo plano")
async def create_plan(tenant_id: str, payload: PlanCreate):
    return await db_insert("plans", {"tenant_id": tenant_id, **payload.model_dump()})

# --- ASSINATURAS ---
@router.get("/subscriptions", summary="Listar assinaturas/matrículas")
async def list_subscriptions(tenant_id: str):
    return await db_select("subscriptions", {"tenant_id": f"eq.{tenant_id}"})

@router.post("/subscriptions", summary="Criar assinatura")
async def create_subscription(tenant_id: str, payload: SubscriptionCreate):
    data = payload.model_dump()
    data["start_date"] = str(data["start_date"])
    if data.get("end_date"): data["end_date"] = str(data["end_date"])
    return await db_insert("subscriptions", {"tenant_id": tenant_id, **data})

# --- FATURAS ---
@router.get("/invoices", summary="Listar faturas")
async def list_invoices(tenant_id: str, status: str = None):
    params = {"tenant_id": f"eq.{tenant_id}"}
    if status: params["status"] = f"eq.{status}"
    return await db_select("invoices", params)

@router.post("/invoices", summary="Criar fatura")
async def create_invoice(tenant_id: str, payload: InvoiceCreate):
    data = payload.model_dump()
    data["due_date"] = str(data["due_date"])
    return await db_insert("invoices", {"tenant_id": tenant_id, **data})

# --- PIX ---
@router.post("/pix/generate", summary="Gerar cobrança Pix")
async def generate_pix(tenant_id: str, payload: PixChargeCreate):
    charge_data = {
        "tenant_id": tenant_id,
        "student_id": payload.student_id,
        "invoice_id": payload.invoice_id,
        "amount": payload.amount,
        "status": "pending",
        "pix_key_dynamic": f"wefit-pix-{datetime.now().timestamp()}",
        "qr_code_base64": "PLACEHOLDER_QR_BASE64"
    }
    return await db_insert("pix_charges", charge_data)

# --- CAIXA ---
@router.get("/cash-register", summary="Listar caixas")
async def list_cash_registers(tenant_id: str):
    return await db_select("cash_registers", {"tenant_id": f"eq.{tenant_id}", "order": "opened_at.desc"})

@router.post("/cash-register/open", summary="Abrir caixa do dia")
async def open_cash_register(tenant_id: str, opened_by: str, payload: CashRegisterOpen):
    return await db_insert("cash_registers", {
        "tenant_id": tenant_id, "opened_by": opened_by,
        "opening_balance": payload.opening_balance, "status": "open"
    })

@router.post("/cash-register/{register_id}/close", summary="Fechar caixa")
async def close_cash_register(register_id: str, closed_by: str):
    return await db_update("cash_registers", f"id=eq.{register_id}", {
        "closed_by": closed_by, "status": "closed",
        "closed_at": datetime.now().isoformat()
    })

@router.post("/cash-register/{register_id}/transaction", summary="Registrar venda no caixa")
async def add_transaction(register_id: str, tenant_id: str, created_by: str, payload: CashRegisterTransaction):
    return await db_insert("cash_register_transactions", {
        "tenant_id": tenant_id, "cash_register_id": register_id,
        "created_by": created_by, **payload.model_dump()
    })

# --- INADIMPLÊNCIA ---
@router.get("/delinquency", summary="Painel de inadimplência")
async def delinquency_dashboard(tenant_id: str):
    overdue = await db_select("invoices", {"tenant_id": f"eq.{tenant_id}", "status": "eq.overdue"})
    pending = await db_select("invoices", {"tenant_id": f"eq.{tenant_id}", "status": "eq.pending"})
    rules = await db_select("delinquency_rules", {"tenant_id": f"eq.{tenant_id}"})
    return {"overdue_invoices": overdue, "pending_invoices": pending, "rules": rules}

@router.post("/delinquency/rules", summary="Criar regra de inadimplência")
async def create_delinquency_rule(tenant_id: str, payload: DelinquencyRuleCreate):
    return await db_insert("delinquency_rules", {"tenant_id": tenant_id, **payload.model_dump()})
