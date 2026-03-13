from fastapi import APIRouter
from database import db_select, db_insert, db_update
from schemas import LeadCreate, LeadMove, PipelineStageCreate, LeadActivityCreate, SalesGoalCreate

router = APIRouter(prefix="/crm", tags=["Módulo 2 — CRM e Vendas"])

# --- PIPELINE STAGES ---
@router.get("/pipeline-stages", summary="Listar etapas do funil")
async def list_stages(tenant_id: str):
    return await db_select("pipeline_stages", {"tenant_id": f"eq.{tenant_id}", "order": "order_index.asc"})

@router.post("/pipeline-stages", summary="Criar etapa do funil")
async def create_stage(tenant_id: str, payload: PipelineStageCreate):
    return await db_insert("pipeline_stages", {"tenant_id": tenant_id, **payload.model_dump()})

# --- LEADS ---
@router.get("/leads", summary="Listar leads")
async def list_leads(tenant_id: str, stage_id: str = None):
    params = {"tenant_id": f"eq.{tenant_id}"}
    if stage_id: params["pipeline_stage_id"] = f"eq.{stage_id}"
    return await db_select("leads", params)

@router.post("/leads", summary="Criar lead")
async def create_lead(tenant_id: str, payload: LeadCreate):
    return await db_insert("leads", {"tenant_id": tenant_id, **payload.model_dump()})

@router.patch("/leads/{lead_id}/move", summary="Mover lead entre etapas (Kanban)")
async def move_lead(lead_id: str, payload: LeadMove):
    return await db_update("leads", f"id=eq.{lead_id}", {"pipeline_stage_id": payload.pipeline_stage_id})

# --- ATIVIDADES ---
@router.get("/lead-activities", summary="Listar atividades de um lead")
async def list_activities(lead_id: str):
    return await db_select("lead_activities", {"lead_id": f"eq.{lead_id}", "order": "created_at.desc"})

@router.post("/lead-activities", summary="Registrar interação com lead")
async def create_activity(tenant_id: str, payload: LeadActivityCreate):
    data = payload.model_dump()
    if data.get("scheduled_at"): data["scheduled_at"] = data["scheduled_at"].isoformat()
    return await db_insert("lead_activities", {"tenant_id": tenant_id, **data})

# --- METAS ---
@router.get("/sales-goals", summary="Listar metas de vendas")
async def list_goals(tenant_id: str):
    return await db_select("sales_goals", {"tenant_id": f"eq.{tenant_id}"})

@router.post("/sales-goals", summary="Criar meta de vendas")
async def create_goal(tenant_id: str, payload: SalesGoalCreate):
    data = payload.model_dump()
    data["period_start"] = str(data["period_start"])
    data["period_end"] = str(data["period_end"])
    return await db_insert("sales_goals", {"tenant_id": tenant_id, **data})

# --- DASHBOARD ---
@router.get("/dashboard", summary="Dashboard de conversão (CAC, taxa de fechamento)")
async def conversion_dashboard(tenant_id: str):
    leads = await db_select("leads", {"tenant_id": f"eq.{tenant_id}"})
    goals = await db_select("sales_goals", {"tenant_id": f"eq.{tenant_id}"})
    subscriptions = await db_select("subscriptions", {"tenant_id": f"eq.{tenant_id}"})
    total_leads = len(leads)
    total_enrolled = len(subscriptions)
    conversion_rate = round((total_enrolled / total_leads * 100), 2) if total_leads > 0 else 0
    return {
        "total_leads": total_leads,
        "total_enrolled": total_enrolled,
        "conversion_rate_pct": conversion_rate,
        "goals": goals
    }
