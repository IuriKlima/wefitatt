from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime

# ==========================================
# AUTH
# ==========================================
class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str
    phone: Optional[str] = None
    role: str = "aluno"
    tenant_id: Optional[str] = None
    company_name: Optional[str] = None
    document_cnpj: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

# ==========================================
# MÓDULO 1: FINANCEIRO
# ==========================================
class PlanCreate(BaseModel):
    name: str
    price: float
    billing_cycle: str = "mensal"

class SubscriptionCreate(BaseModel):
    student_id: str
    plan_id: str
    start_date: date
    end_date: Optional[date] = None

class InvoiceCreate(BaseModel):
    subscription_id: Optional[str] = None
    amount: float
    due_date: date
    payment_method: Optional[str] = None

class CashRegisterOpen(BaseModel):
    opening_balance: float = 0

class CashRegisterTransaction(BaseModel):
    description: str
    amount: float
    type: str = "income"
    payment_method: str = "cash"

class PixChargeCreate(BaseModel):
    student_id: str
    invoice_id: Optional[str] = None
    amount: float

class DelinquencyRuleCreate(BaseModel):
    days_tolerance: int = 5
    action: str = "both"
    reminder_message: Optional[str] = None

# ==========================================
# MÓDULO 2: CRM
# ==========================================
class LeadCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    source: Optional[str] = None
    pipeline_stage_id: Optional[str] = None

class LeadMove(BaseModel):
    pipeline_stage_id: str

class PipelineStageCreate(BaseModel):
    name: str
    order_index: int = 0

class LeadActivityCreate(BaseModel):
    lead_id: str
    type: str
    description: Optional[str] = None
    scheduled_at: Optional[datetime] = None

class SalesGoalCreate(BaseModel):
    consultant_id: Optional[str] = None
    period_start: date
    period_end: date
    target_revenue: Optional[float] = None
    target_enrollments: Optional[int] = None

# ==========================================
# MÓDULO 3: OPERAÇÕES
# ==========================================
class CheckinRequest(BaseModel):
    student_id: str
    method: str = "qr_code"
    device_id: Optional[str] = None

class ClassScheduleCreate(BaseModel):
    name: str
    instructor_id: Optional[str] = None
    day_of_week: int
    start_time: str
    end_time: str
    capacity: int = 20
    location: Optional[str] = None

class BookingCreate(BaseModel):
    class_schedule_id: str
    student_id: str
    booking_date: date

class ContractCreate(BaseModel):
    student_id: str
    subscription_id: Optional[str] = None
    plan_id: Optional[str] = None
    content: str
    valid_from: Optional[date] = None
    valid_until: Optional[date] = None

# ==========================================
# MÓDULO 4: ALUNO
# ==========================================
class WorkoutLogCreate(BaseModel):
    workout_id: Optional[str] = None
    notes: Optional[str] = None
    rating: Optional[int] = None

class NotificationCreate(BaseModel):
    student_id: str
    title: str
    body: str
    type: str = "info"

# ==========================================
# MÓDULO 5: TÉCNICO
# ==========================================
class ExerciseCreate(BaseModel):
    name: str
    muscle_group: Optional[str] = None
    equipment: Optional[str] = None
    description: Optional[str] = None
    video_url: Optional[str] = None
    gif_url: Optional[str] = None

class WorkoutCreate(BaseModel):
    student_id: Optional[str] = None
    name: str
    description: Optional[str] = None
    is_template: bool = False
    valid_from: Optional[date] = None
    valid_until: Optional[date] = None

class WorkoutExerciseAdd(BaseModel):
    exercise_id: str
    order_index: int = 0
    sets: int = 3
    reps: str = "12"
    weight: Optional[str] = None
    rest_seconds: int = 60
    notes: Optional[str] = None

class AssessmentCreate(BaseModel):
    student_id: str
    weight_kg: Optional[float] = None
    height_cm: Optional[float] = None
    body_fat_pct: Optional[float] = None
    lean_mass_kg: Optional[float] = None
    chest_fold: Optional[float] = None
    abdominal_fold: Optional[float] = None
    thigh_fold: Optional[float] = None
    triceps_fold: Optional[float] = None
    suprailiac_fold: Optional[float] = None
    waist_circ: Optional[float] = None
    hip_circ: Optional[float] = None
    arm_right_circ: Optional[float] = None
    arm_left_circ: Optional[float] = None
    anamnesis: Optional[str] = None
    objectives: Optional[str] = None
    notes: Optional[str] = None

# ==========================================
# MÓDULO 6: ECOSSISTEMA
# ==========================================
class ApiKeyCreate(BaseModel):
    name: str
    permissions: Optional[list] = ["read"]

class WebhookCreate(BaseModel):
    url: str
    events: List[str]
    secret: Optional[str] = None

# ==========================================
# M�DULO: CRM (Fase 1)
# ==========================================
class PipelineStageCreate(BaseModel):
    name: str
    order_index: int = 0
    color: str = '#8B5CF6'
    tenant_id: str

class PipelineStageUpdate(BaseModel):
    name: Optional[str] = None
    order_index: Optional[int] = None
    color: Optional[str] = None

class LeadCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    source: Optional[str] = 'manual'
    stage_id: Optional[str] = None
    tenant_id: str

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    stage_id: Optional[str] = None
    status: Optional[str] = None
    score: Optional[float] = None

class LeadActivityCreate(BaseModel):
    lead_id: str
    user_id: str
    type: str # 'call', 'whatsapp', 'note'
    description: str

# ==========================================
# M�DULO: CHECKOUT (Fase 1)
# ==========================================
class PlanCreate(BaseModel):
    name: str
    price: float
    billing_cycle: str = 'MONTHLY'
    duration_days: int = 30
    features: list = []
    tenant_id: str

class CheckoutRequest(BaseModel):
    plan_id: str
    student_id: str
    payment_method: str = 'credit_card'
    tenant_id: str
