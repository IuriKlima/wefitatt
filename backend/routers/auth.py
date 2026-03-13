from fastapi import APIRouter, HTTPException, status
from schemas import UserRegister, UserLogin
from database import auth_signup, auth_signin, db_insert

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/register", summary="Cria usuário no Supabase e tabela profiles")
async def register_user(payload: UserRegister):
    try:
        # 1. Cria usuário no Auth (Identidade Supabase)
        auth_data = await auth_signup(payload.email, payload.password)

        user_id = auth_data.get("id")
        if not user_id:
            raise HTTPException(status_code=400, detail="Erro ao criar conta no provedor de autenticação")

        tenant_id = payload.tenant_id

        # 2. Se for dono de academia, registra um novo Tenant
        if not tenant_id and payload.company_name:
            tenant_res = await db_insert("tenants", {
                "name": payload.company_name,
                "document_cnpj": payload.document_cnpj
            })
            if tenant_res:
                tenant_id = tenant_res[0]['id']

        # 3. Criar registro na tabela pública `profiles`
        await db_insert("profiles", {
            "id": user_id,
            "tenant_id": tenant_id,
            "role": payload.role,
            "full_name": payload.full_name,
            "phone": payload.phone
        })

        return {
            "message": "Usuário registrado com sucesso!",
            "user_id": user_id,
            "tenant_id": tenant_id
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Falha no registro: {str(e)}"
        )

@router.post("/login", summary="Gera token de sessão do Supabase")
async def login_user(payload: UserLogin):
    try:
        auth_data = await auth_signin(payload.email, payload.password)

        access_token = auth_data.get("access_token")
        if not access_token:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")

        return {
            "access_token": access_token,
            "refresh_token": auth_data.get("refresh_token"),
            "user": auth_data.get("user", {})
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Erro no login: {str(e)}")
