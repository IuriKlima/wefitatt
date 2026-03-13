from fastapi import APIRouter, HTTPException
from database import db_select, db_insert, db_update
from schemas import CheckinRequest, ClassScheduleCreate, BookingCreate, ContractCreate
from datetime import datetime

router = APIRouter(prefix="/operations", tags=["Módulo 3 — Operação e Controle de Acesso"])

# --- CHECK-IN ---
@router.post("/checkin", summary="Registrar check-in (QR/biometria/facial)")
async def checkin(tenant_id: str, payload: CheckinRequest):
    # Verificar se aluno não está bloqueado por inadimplência
    overdue = await db_select("invoices", {
        "tenant_id": f"eq.{tenant_id}", "student_id": f"eq.{payload.student_id}", "status": "eq.overdue"
    })
    if overdue:
        log = await db_insert("access_logs", {
            "tenant_id": tenant_id, "student_id": payload.student_id,
            "device_id": payload.device_id, "method": payload.method,
            "status": "blocked", "denied_reason": "Faturas em atraso"
        })
        raise HTTPException(status_code=403, detail="Acesso bloqueado: faturas em atraso")

    log = await db_insert("access_logs", {
        "tenant_id": tenant_id, "student_id": payload.student_id,
        "device_id": payload.device_id, "method": payload.method, "status": "granted"
    })
    # Gamificação: +10 pontos por check-in
    await db_insert("gamification_points", {
        "tenant_id": tenant_id, "student_id": payload.student_id,
        "points": 10, "reason": "Check-in na academia", "reference_type": "checkin"
    })
    return {"status": "granted", "log": log}

@router.get("/access-logs", summary="Log de entradas")
async def list_access_logs(tenant_id: str, student_id: str = None):
    params = {"tenant_id": f"eq.{tenant_id}", "order": "checked_in_at.desc", "limit": "50"}
    if student_id: params["student_id"] = f"eq.{student_id}"
    return await db_select("access_logs", params)

# --- GRADE DE AULAS ---
@router.get("/class-schedules", summary="Grade de aulas")
async def list_class_schedules(tenant_id: str):
    return await db_select("class_schedules", {"tenant_id": f"eq.{tenant_id}", "is_active": "eq.true", "order": "day_of_week.asc,start_time.asc"})

@router.post("/class-schedules", summary="Criar aula na grade")
async def create_class_schedule(tenant_id: str, payload: ClassScheduleCreate):
    return await db_insert("class_schedules", {"tenant_id": tenant_id, **payload.model_dump()})

# --- RESERVAS E FILA DE ESPERA ---
@router.get("/bookings", summary="Listar reservas de uma aula")
async def list_bookings(class_schedule_id: str, booking_date: str):
    return await db_select("class_bookings", {
        "class_schedule_id": f"eq.{class_schedule_id}", "booking_date": f"eq.{booking_date}",
        "order": "booked_at.asc"
    })

@router.post("/bookings", summary="Reservar vaga em aula")
async def create_booking(tenant_id: str, payload: BookingCreate):
    # Verificar capacidade
    schedule = await db_select("class_schedules", {"id": f"eq.{payload.class_schedule_id}"})
    if not schedule:
        raise HTTPException(status_code=404, detail="Aula não encontrada")
    capacity = schedule[0]["capacity"]
    current = await db_select("class_bookings", {
        "class_schedule_id": f"eq.{payload.class_schedule_id}",
        "booking_date": f"eq.{str(payload.booking_date)}",
        "status": "eq.booked"
    })
    if len(current) >= capacity:
        # Colocar na fila
        waitlist_pos = len(await db_select("class_bookings", {
            "class_schedule_id": f"eq.{payload.class_schedule_id}",
            "booking_date": f"eq.{str(payload.booking_date)}",
            "status": "eq.waitlist"
        })) + 1
        return await db_insert("class_bookings", {
            "tenant_id": tenant_id, "class_schedule_id": payload.class_schedule_id,
            "student_id": payload.student_id, "booking_date": str(payload.booking_date),
            "status": "waitlist", "waitlist_position": waitlist_pos
        })
    return await db_insert("class_bookings", {
        "tenant_id": tenant_id, "class_schedule_id": payload.class_schedule_id,
        "student_id": payload.student_id, "booking_date": str(payload.booking_date), "status": "booked"
    })

# --- CONTRATOS ---
@router.get("/contracts", summary="Listar contratos")
async def list_contracts(tenant_id: str, student_id: str = None):
    params = {"tenant_id": f"eq.{tenant_id}"}
    if student_id: params["student_id"] = f"eq.{student_id}"
    return await db_select("contracts", params)

@router.post("/contracts", summary="Criar contrato digital")
async def create_contract(tenant_id: str, payload: ContractCreate):
    data = payload.model_dump()
    if data.get("valid_from"): data["valid_from"] = str(data["valid_from"])
    if data.get("valid_until"): data["valid_until"] = str(data["valid_until"])
    return await db_insert("contracts", {"tenant_id": tenant_id, **data})

@router.post("/contracts/{contract_id}/sign", summary="Assinar contrato digitalmente")
async def sign_contract(contract_id: str, signature_ip: str = "0.0.0.0"):
    import hashlib
    sig_hash = hashlib.sha256(f"{contract_id}-{datetime.now().isoformat()}".encode()).hexdigest()
    return await db_update("contracts", f"id=eq.{contract_id}", {
        "status": "signed", "signed_at": datetime.now().isoformat(),
        "signature_ip": signature_ip, "signature_hash": sig_hash
    })
