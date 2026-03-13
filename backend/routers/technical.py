from fastapi import APIRouter
from database import db_select, db_insert, db_update
from schemas import ExerciseCreate, WorkoutCreate, WorkoutExerciseAdd, AssessmentCreate

router = APIRouter(prefix="/technical", tags=["Módulo 5 — Área Técnica (Professores)"])

# --- CATÁLOGO DE EXERCÍCIOS ---
@router.get("/exercises", summary="Listar exercícios do catálogo")
async def list_exercises(tenant_id: str = None, muscle_group: str = None):
    params = {}
    if tenant_id:
        params["or"] = f"(tenant_id.eq.{tenant_id},tenant_id.is.null)"
    if muscle_group:
        params["muscle_group"] = f"eq.{muscle_group}"
    params["order"] = "name.asc"
    return await db_select("exercises", params)

@router.post("/exercises", summary="Criar exercício no catálogo")
async def create_exercise(tenant_id: str, payload: ExerciseCreate):
    return await db_insert("exercises", {"tenant_id": tenant_id, **payload.model_dump()})

# --- CONSTRUTOR DE TREINOS ---
@router.get("/workouts", summary="Listar fichas de treino (templates e personalizadas)")
async def list_workouts(tenant_id: str, is_template: bool = None, student_id: str = None):
    params = {"tenant_id": f"eq.{tenant_id}", "order": "created_at.desc"}
    if is_template is not None: params["is_template"] = f"eq.{is_template}"
    if student_id: params["student_id"] = f"eq.{student_id}"
    return await db_select("workouts", params)

@router.post("/workouts", summary="Criar ficha de treino")
async def create_workout(tenant_id: str, instructor_id: str, payload: WorkoutCreate):
    data = payload.model_dump()
    if data.get("valid_from"): data["valid_from"] = str(data["valid_from"])
    if data.get("valid_until"): data["valid_until"] = str(data["valid_until"])
    return await db_insert("workouts", {"tenant_id": tenant_id, "instructor_id": instructor_id, **data})

@router.get("/workouts/{workout_id}/exercises", summary="Listar exercícios de uma ficha")
async def list_workout_exercises(workout_id: str):
    return await db_select("workout_exercises", {"workout_id": f"eq.{workout_id}", "order": "order_index.asc"})

@router.post("/workouts/{workout_id}/exercises", summary="Adicionar exercício à ficha")
async def add_exercise_to_workout(workout_id: str, payload: WorkoutExerciseAdd):
    return await db_insert("workout_exercises", {"workout_id": workout_id, **payload.model_dump()})

# --- AVALIAÇÕES FÍSICAS ---
@router.get("/assessments", summary="Listar avaliações de um aluno")
async def list_assessments(tenant_id: str, student_id: str):
    return await db_select("physical_assessments", {
        "tenant_id": f"eq.{tenant_id}", "student_id": f"eq.{student_id}",
        "order": "assessment_date.desc"
    })

@router.post("/assessments", summary="Registrar avaliação física completa")
async def create_assessment(tenant_id: str, instructor_id: str, payload: AssessmentCreate):
    data = payload.model_dump()
    # Calcular BMI automaticamente
    if data.get("weight_kg") and data.get("height_cm"):
        height_m = data["height_cm"] / 100
        data["bmi"] = round(data["weight_kg"] / (height_m ** 2), 2)
    return await db_insert("physical_assessments", {
        "tenant_id": tenant_id, "instructor_id": instructor_id, **data
    })

@router.get("/assessments/{assessment_id}/photos", summary="Listar fotos de evolução")
async def list_assessment_photos(assessment_id: str):
    return await db_select("assessment_photos", {"assessment_id": f"eq.{assessment_id}"})

@router.post("/assessments/{assessment_id}/photos", summary="Adicionar foto de evolução")
async def add_assessment_photo(assessment_id: str, tenant_id: str, photo_url: str, angle: str = "front"):
    return await db_insert("assessment_photos", {
        "tenant_id": tenant_id, "assessment_id": assessment_id,
        "photo_url": photo_url, "angle": angle
    })
