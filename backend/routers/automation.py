from fastapi import APIRouter, Header
from pydantic import BaseModel
from typing import Optional
import httpx
from database import db_select

router = APIRouter(prefix="/automation", tags=["Automação (n8n)"])

class MessagePayload(BaseModel):
    phone: str
    message: str
    tenant_id: str
    lead_id: Optional[str] = None

# A URL do webhook do n8n pode vir do banco de dados (configurações do tenant)
# ou do .env (global). Para simplicidade inicial, hardcoded ou param:
N8N_WEBHOOK_URL = "http://localhost:5678/webhook/wefit-whatsapp"

@router.post("/send-whatsapp", summary="Dispara mensagem via n8n/Evolution API")
async def send_whatsapp(payload: MessagePayload):
    """
    Este endpoint facilita que o frontend da WeFit e outras partes do sistema
    disparem mensagens pelo WhatsApp sem precisar conhecer as URLs complexas do n8n.
    O backend apenas atua como um proxy padronizado.
    """
    async with httpx.AsyncClient() as client:
        try:
            req = await client.post(N8N_WEBHOOK_URL, json=payload.dict())
            req.raise_for_status()
            return {"success": True, "message": "Enviado para n8n"}
        except Exception as e:
            return {"success": False, "error": str(e)}

@router.get("/leads/stale", summary="Listar leads parados (Para n8n buscar e aquecer)")
async def get_stale_leads(tenant_id: str = Header(..., alias="X-Tenant-Id"), days: int = 7):
    """
    Endpoint otimizado para que o n8n faça polling ou consulte leads sem contato
    recente. Útil para fluxos de recuperação (Follow-up automático).
    Na lógica real, usaríamos a data da última atividade. 
    Aqui filtramos por leads abertos criados antes de X dias, para simplificar.
    """
    # Exemplo: TODO: Filtrar usando data
    leads = await db_select("leads", {"tenant_id": f"eq.{tenant_id}", "status": "eq.open"})
    return {"stale_leads": leads}
