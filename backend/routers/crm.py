from fastapi import APIRouter, HTTPException, Header
from typing import Optional, List
from schemas import PipelineStageCreate, PipelineStageUpdate, LeadCreate, LeadUpdate, LeadActivityCreate
from database import db_insert, db_select, db_update, db_delete

router = APIRouter(prefix="/crm", tags=["CRM & Leads"])

# --- PIPELINE STAGES ---

@router.get("/stages", summary="Listar estágios do funil do tenant")
async def get_stages(tenant_id: str = Header(..., alias="X-Tenant-Id")):
    return await db_select("pipeline_stages", {"tenant_id": f"eq.{tenant_id}", "order": "order_index.asc"})

@router.post("/stages", summary="Criar estágio no funil")
async def create_stage(payload: PipelineStageCreate):
    return await db_insert("pipeline_stages", payload.dict())

@router.patch("/stages/{stage_id}", summary="Atualizar estágio (nome, cor, ordem)")
async def update_stage(stage_id: str, payload: PipelineStageUpdate):
    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    return await db_update("pipeline_stages", f"id=eq.{stage_id}", update_data)

@router.delete("/stages/{stage_id}", summary="Remover estágio")
async def delete_stage(stage_id: str):
    return await db_delete("pipeline_stages", f"id=eq.{stage_id}")

# --- LEADS ---

@router.get("/leads", summary="Listar todos os leads do tenant")
async def get_leads(tenant_id: str = Header(..., alias="X-Tenant-Id"), stage_id: Optional[str] = None):
    params = {"tenant_id": f"eq.{tenant_id}", "order": "created_at.desc"}
    if stage_id:
        params["stage_id"] = f"eq.{stage_id}"
    return await db_select("leads", params)

@router.post("/leads", summary="Cadastrar novo lead")
async def create_lead(payload: LeadCreate):
    return await db_insert("leads", payload.dict())

@router.patch("/leads/{lead_id}", summary="Atualizar lead (mover de estágio, mudar status)")
async def update_lead(lead_id: str, payload: LeadUpdate):
    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    return await db_update("leads", f"id=eq.{lead_id}", update_data)

@router.get("/leads/{lead_id}", summary="Detalhes de um lead específico")
async def get_lead(lead_id: str):
    result = await db_select("leads", {"id": f"eq.{lead_id}"})
    if not result:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return result[0]

# --- ATIVIDADES (Histórico) ---

@router.get("/leads/{lead_id}/activities", summary="Ver histórico do lead")
async def get_activities(lead_id: str):
    return await db_select("lead_activities", {"lead_id": f"eq.{lead_id}", "order": "created_at.desc"})

@router.post("/activities", summary="Registrar nova atividade no lead")
async def create_activity(payload: LeadActivityCreate):
    return await db_insert("lead_activities", payload.dict())
