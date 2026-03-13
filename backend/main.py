from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="WeFit API",
    description="Backend Multi-Tenant para a plataforma WeFit SaaS",
    version="1.0.0"
)

from routers import auth, financial, crm, operations, student, technical, webhooks

# Configurando CORS para permitir que o Vite/React faça requisições
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Será restrito em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra TODOS os routers (6 módulos + auth)
app.include_router(auth.router)
app.include_router(financial.router)
app.include_router(crm.router)
app.include_router(operations.router)
app.include_router(student.router)
app.include_router(technical.router)
app.include_router(webhooks.router)

@app.get("/")
def read_root():
    return {"message": "WeFit API Backend is running!"}

@app.get("/health")
def auth_status():
    return {"status": "healthy", "service": "WeFit FastAPI"}
