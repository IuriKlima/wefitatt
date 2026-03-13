from fastapi import APIRouter
from database import db_select, db_insert
from schemas import ApiKeyCreate, WebhookCreate
import hashlib, secrets

router = APIRouter(prefix="/ecosystem", tags=["Módulo 6 — Arquitetura Aberta (API/Webhooks)"])

# --- API KEYS ---
@router.get("/api-keys", summary="Listar API Keys do tenant")
async def list_api_keys(tenant_id: str):
    keys = await db_select("api_keys", {"tenant_id": f"eq.{tenant_id}"})
    # Nunca retornar o hash, apenas o prefixo
    for k in keys:
        k.pop("key_hash", None)
    return keys

@router.post("/api-keys", summary="Gerar nova API Key")
async def create_api_key(tenant_id: str, payload: ApiKeyCreate):
    raw_key = f"wf_{secrets.token_hex(24)}"
    key_hash = hashlib.sha256(raw_key.encode()).hexdigest()
    key_prefix = raw_key[:10]
    result = await db_insert("api_keys", {
        "tenant_id": tenant_id, "name": payload.name,
        "key_hash": key_hash, "key_prefix": key_prefix,
        "permissions": payload.permissions
    })
    # Retornar a chave em texto puro APENAS na criação (depois não será mais possível ver)
    if result:
        result[0]["raw_key"] = raw_key
    return result

# --- WEBHOOKS ---
@router.get("/webhooks", summary="Listar assinaturas de webhook")
async def list_webhooks(tenant_id: str):
    return await db_select("webhook_subscriptions", {"tenant_id": f"eq.{tenant_id}"})

@router.post("/webhooks", summary="Registrar novo webhook")
async def create_webhook(tenant_id: str, payload: WebhookCreate):
    secret = payload.secret or secrets.token_hex(16)
    return await db_insert("webhook_subscriptions", {
        "tenant_id": tenant_id, "url": payload.url,
        "events": payload.events, "secret": secret, "is_active": True
    })

@router.get("/webhook-logs", summary="Ver log de disparos de webhook")
async def list_webhook_logs(tenant_id: str, subscription_id: str = None):
    params = {"tenant_id": f"eq.{tenant_id}", "order": "created_at.desc", "limit": "50"}
    if subscription_id: params["subscription_id"] = f"eq.{subscription_id}"
    return await db_select("webhook_logs", params)

# --- EVENTOS DISPONÍVEIS (para documentação) ---
@router.get("/events", summary="Listar eventos disponíveis para webhook")
async def list_available_events():
    return {
        "events": [
            {"name": "student.created", "description": "Quando um novo aluno é cadastrado"},
            {"name": "student.checkin", "description": "Quando um aluno faz check-in"},
            {"name": "payment.received", "description": "Quando um pagamento é confirmado"},
            {"name": "payment.overdue", "description": "Quando uma fatura vence"},
            {"name": "subscription.created", "description": "Quando uma nova matrícula é feita"},
            {"name": "subscription.canceled", "description": "Quando uma matrícula é cancelada"},
            {"name": "lead.created", "description": "Quando um novo lead é captado"},
            {"name": "lead.converted", "description": "Quando um lead se torna aluno"},
            {"name": "class.booked", "description": "Quando uma aula é reservada"},
            {"name": "assessment.completed", "description": "Quando uma avaliação física é finalizada"},
        ]
    }
