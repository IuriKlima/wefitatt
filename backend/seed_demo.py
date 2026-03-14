import asyncio
import os
import sys

# Change directory to backend to import local modules properly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import auth_signup, db_insert, db_select

async def seed():
    print("Starting DB Seed for WeFit Demo...")
    
    # 1. Create a Super Admin account
    print("\n[1] Creating Demo Super Admin (super@wefit.com / 123456)...")
    try:
        super_res = await auth_signup("super@wefit.com", "123456")
        if super_res and "id" in super_res:
            await db_insert("profiles", {
                "id": super_res["id"],
                "role": "super_admin",
                "full_name": "Super Admin Demo",
                "tenant_id": None
            })
            print("Super Admin created.")
    except Exception as e:
        print(f"Skipping/Error creating super admin: {e} (User may already exist)")

    # 2. Create a Gestor account and a Tenant
    print("\n[2] Creating Demo Gestor (gestor@wefit.com / 123456) and Tenant...")
    tenant_id = None
    try:
        gestor_res = await auth_signup("gestor@wefit.com", "123456")
        if gestor_res and "id" in gestor_res:
            gestor_id = gestor_res["id"]
            
            # Create tenant
            tenant_res = await db_insert("tenants", {
                "name": "Academia Demo Pro",
                "document_cnpj": "00.000.000/0001-00"
            })
            if tenant_res:
                tenant_id = tenant_res[0]["id"]
                print(f"Tenant 'Academia Demo Pro' created. ID: {tenant_id}")
            
            # Create profile
            await db_insert("profiles", {
                "id": gestor_id,
                "role": "gestor",
                "full_name": "Gestor Demo",
                "tenant_id": tenant_id,
                "phone": "11999999999"
            })
            print("Gestor created and linked to tenant.")
    except Exception as e:
        print(f"Skipping/Error creating gestor: {e} (User may already exist)")
        # Fallback: find existing gestor to grab tenant_id
        try:
            print("Checking existing gestor profile for tenant_id...")
            profiles = await db_select("profiles", {"role": "gestor"})
            if profiles:
                tenant_id = profiles[0].get("tenant_id")
                print(f"Found existing gestor tenant_id: {tenant_id}")
        except Exception:
            pass

    # 3. If we have a tenant, feed it some CRM data
    if tenant_id:
        print("\n[3] Checking CRM pipeline stages for tenant...")
        try:
            existing_stages = await db_select("pipeline_stages", {"tenant_id": tenant_id})
            if not existing_stages:
                print("Feeding CRM pipeline stages...")
                stages = [
                    {"tenant_id": tenant_id, "name": "Lead Frio", "color": "#94a3b8", "order_index": 0},
                    {"tenant_id": tenant_id, "name": "Contato Feito", "color": "#3b82f6", "order_index": 1},
                    {"tenant_id": tenant_id, "name": "Aula Experimental", "color": "#f59e0b", "order_index": 2},
                    {"tenant_id": tenant_id, "name": "Negociação", "color": "#8b5cf6", "order_index": 3},
                    {"tenant_id": tenant_id, "name": "Fechado/Ganho", "color": "#10b981", "order_index": 4},
                ]
                
                stages_res = await db_insert("pipeline_stages", stages)
                
                if stages_res:
                    print("Pipeline stages created.")
                    print("Feeding CRM leads...")
                    leads = [
                        {"tenant_id": tenant_id, "name": "Lucas Silva", "phone": "11999999999", "email": "lucas@gmail.com", "source": "Instagram", "score": 85, "stage_id": stages_res[0]["id"]},
                        {"tenant_id": tenant_id, "name": "Mariana Souza", "phone": "11988888888", "source": "Landing Page", "score": 92, "stage_id": stages_res[0]["id"]},
                        {"tenant_id": tenant_id, "name": "Pedro Alves", "email": "pedro@hotmail.com", "source": "Referência", "score": 45, "stage_id": stages_res[1]["id"]},
                        {"tenant_id": tenant_id, "name": "Ana Costa", "phone": "11977777777", "email": "ana@empresa.com", "source": "WhatsApp", "score": 99, "stage_id": stages_res[2]["id"]},
                    ]
                    await db_insert("leads", leads)
                    print("Leads inserted.")
            else:
                print("CRM Data already seeded for this tenant.")
        except Exception as e:
            print(f"Error seeding CRM data: {e}")
    else:
        print("\n[!] No tenant_id found, skipping CRM seed.")
        
    print("\nSeed complete! You can now log in with the real demo users.")

if __name__ == "__main__":
    from dotenv import load_dotenv
    # Ensure env vars are loaded from backend/.env
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))
    asyncio.run(seed())
