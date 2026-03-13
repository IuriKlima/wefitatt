import os
import httpx
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL: str = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Variáveis de ambiente SUPABASE_URL e/ou SUPABASE_KEY não encontradas. Verifique o arquivo .env.")

# Headers padrão para todas as requisições ao Supabase REST
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

def supabase_rest_url(table: str) -> str:
    """Monta a URL do PostgREST: /rest/v1/{table}"""
    return f"{SUPABASE_URL}/rest/v1/{table}"

def supabase_auth_url(path: str) -> str:
    """Monta a URL do Auth: /auth/v1/{path}"""
    return f"{SUPABASE_URL}/auth/v1/{path}"

async def db_select(table: str, params: dict | None = None) -> list:
    """SELECT na tabela via PostgREST."""
    async with httpx.AsyncClient() as client:
        res = await client.get(supabase_rest_url(table), headers=HEADERS, params=params or {})
        res.raise_for_status()
        return res.json()

async def db_insert(table: str, data: dict) -> list:
    """INSERT na tabela via PostgREST."""
    async with httpx.AsyncClient() as client:
        res = await client.post(supabase_rest_url(table), headers=HEADERS, json=data)
        res.raise_for_status()
        return res.json()

async def db_update(table: str, match_params: str, data: dict) -> list:
    """UPDATE na tabela. match_params ex: 'id=eq.xxxx'"""
    async with httpx.AsyncClient() as client:
        url = f"{supabase_rest_url(table)}?{match_params}"
        res = await client.patch(url, headers=HEADERS, json=data)
        res.raise_for_status()
        return res.json()

async def db_delete(table: str, match_params: str) -> list:
    """DELETE na tabela. match_params ex: 'id=eq.xxxx'"""
    async with httpx.AsyncClient() as client:
        url = f"{supabase_rest_url(table)}?{match_params}"
        res = await client.delete(url, headers=HEADERS)
        res.raise_for_status()
        return res.json()

async def auth_signup(email: str, password: str) -> dict:
    """Cria usuário no Supabase Auth."""
    async with httpx.AsyncClient() as client:
        res = await client.post(
            supabase_auth_url("signup"),
            headers=HEADERS,
            json={"email": email, "password": password}
        )
        res.raise_for_status()
        return res.json()

async def auth_signin(email: str, password: str) -> dict:
    """Login via Supabase Auth."""
    async with httpx.AsyncClient() as client:
        res = await client.post(
            supabase_auth_url("token?grant_type=password"),
            headers=HEADERS,
            json={"email": email, "password": password}
        )
        res.raise_for_status()
        return res.json()
