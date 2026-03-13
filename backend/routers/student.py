from fastapi import APIRouter
from database import db_select, db_insert, db_update
from schemas import WorkoutLogCreate, NotificationCreate

router = APIRouter(prefix="/student", tags=["Módulo 4 — Experiência do Aluno"])

# --- TREINOS DO ALUNO ---
@router.get("/workouts/{student_id}", summary="Fichas de treino do aluno")
async def get_student_workouts(student_id: str):
    workouts = await db_select("workouts", {"student_id": f"eq.{student_id}", "order": "created_at.desc"})
    for w in workouts:
        w["exercises"] = await db_select("workout_exercises", {"workout_id": f"eq.{w['id']}", "order": "order_index.asc"})
    return workouts

@router.post("/workout-logs/{student_id}", summary="Registrar treino executado")
async def log_workout(student_id: str, tenant_id: str, payload: WorkoutLogCreate):
    from datetime import datetime
    data = {"tenant_id": tenant_id, "student_id": student_id, **payload.model_dump()}
    result = await db_insert("workout_logs", data)
    # Gamificação: +20 pontos por treino
    await db_insert("gamification_points", {
        "tenant_id": tenant_id, "student_id": student_id,
        "points": 20, "reason": "Treino concluído", "reference_type": "workout"
    })
    return result

# --- AUTOATENDIMENTO FINANCEIRO ---
@router.get("/billing/{student_id}", summary="Ver faturas e pendências do aluno")
async def get_student_billing(student_id: str, tenant_id: str):
    invoices = await db_select("invoices", {
        "tenant_id": f"eq.{tenant_id}",
        "select": "id,amount,status,due_date,payment_method,paid_at"
    })
    subscriptions = await db_select("subscriptions", {"student_id": f"eq.{student_id}"})
    return {"invoices": invoices, "subscriptions": subscriptions}

# --- GAMIFICAÇÃO ---
@router.get("/gamification/{student_id}", summary="Pontos, badges e ranking do aluno")
async def get_gamification(student_id: str, tenant_id: str):
    points = await db_select("gamification_points", {"student_id": f"eq.{student_id}"})
    total_points = sum(p.get("points", 0) for p in points)
    badges = await db_select("student_badges", {"student_id": f"eq.{student_id}"})
    available_badges = await db_select("gamification_badges", {"tenant_id": f"eq.{tenant_id}"})
    return {
        "total_points": total_points,
        "points_history": points[-10:],
        "earned_badges": badges,
        "available_badges": available_badges
    }

# --- CHECK-IN QR CODE ---
@router.get("/checkin/qrcode/{student_id}", summary="Gerar QR Code para entrada")
async def generate_qr(student_id: str):
    import hashlib
    from datetime import datetime
    token = hashlib.sha256(f"{student_id}-{datetime.now().date()}".encode()).hexdigest()[:16]
    return {"qr_data": f"WEFIT-CHECKIN-{student_id}-{token}", "valid_for": "today"}

# --- NOTIFICAÇÕES ---
@router.get("/notifications/{student_id}", summary="Listar notificações do aluno")
async def list_notifications(student_id: str):
    return await db_select("student_notifications", {
        "student_id": f"eq.{student_id}", "order": "created_at.desc", "limit": "30"
    })

@router.post("/notifications", summary="Enviar notificação para aluno")
async def create_notification(tenant_id: str, payload: NotificationCreate):
    return await db_insert("student_notifications", {"tenant_id": tenant_id, **payload.model_dump()})

@router.patch("/notifications/{notification_id}/read", summary="Marcar notificação como lida")
async def mark_as_read(notification_id: str):
    from datetime import datetime
    return await db_update("student_notifications", f"id=eq.{notification_id}", {
        "is_read": True, "read_at": datetime.now().isoformat()
    })
