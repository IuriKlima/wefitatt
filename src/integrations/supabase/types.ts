export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          company_id: number | null
          created_at: string | null
          id: number
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          company_id?: number | null
          created_at?: string | null
          id?: number
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          company_id?: number | null
          created_at?: string | null
          id?: number
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          address: Json | null
          capacity: number | null
          company_id: number | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          operating_hours: Json | null
          phone: string | null
          status: Database["public"]["Enums"]["status_type"] | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          capacity?: number | null
          company_id?: number | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          operating_hours?: Json | null
          phone?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          capacity?: number | null
          company_id?: number | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          operating_hours?: Json | null
          phone?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_sessions: {
        Row: {
          company_id: number | null
          created_at: string | null
          id: number
          messages: Json | null
          phone_number: string | null
          session_id: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          messages?: Json | null
          phone_number?: string | null
          session_id: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          messages?: Json | null
          phone_number?: string | null
          session_id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_sessions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatbot_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_attendance: {
        Row: {
          attended: boolean | null
          check_in_time: string | null
          class_id: number | null
          created_at: string | null
          id: number
          notes: string | null
          student_id: number | null
        }
        Insert: {
          attended?: boolean | null
          check_in_time?: string | null
          class_id?: number | null
          created_at?: string | null
          id?: number
          notes?: string | null
          student_id?: number | null
        }
        Update: {
          attended?: boolean | null
          check_in_time?: string | null
          class_id?: number | null
          created_at?: string | null
          id?: number
          notes?: string | null
          student_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "class_attendance_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      class_students: {
        Row: {
          class_id: number | null
          enrolled_at: string | null
          id: number
          status: string | null
          student_id: number | null
        }
        Insert: {
          class_id?: number | null
          enrolled_at?: string | null
          id?: number
          status?: string | null
          student_id?: number | null
        }
        Update: {
          class_id?: number | null
          enrolled_at?: string | null
          id?: number
          status?: string | null
          student_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "class_students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      class_types: {
        Row: {
          category: Database["public"]["Enums"]["class_type"] | null
          company_id: number | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          equipment_needed: string[] | null
          id: number
          is_active: boolean | null
          max_participants: number | null
          name: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["class_type"] | null
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          equipment_needed?: string[] | null
          id?: number
          is_active?: boolean | null
          max_participants?: number | null
          name: string
        }
        Update: {
          category?: Database["public"]["Enums"]["class_type"] | null
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          equipment_needed?: string[] | null
          id?: number
          is_active?: boolean | null
          max_participants?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          branch_id: number | null
          class_type_id: number | null
          company_id: number | null
          created_at: string | null
          description: string | null
          end_time: string
          id: number
          instructor_id: number | null
          max_participants: number | null
          room: string | null
          start_time: string
          status: Database["public"]["Enums"]["status_type"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          branch_id?: number | null
          class_type_id?: number | null
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: number
          instructor_id?: number | null
          max_participants?: number | null
          room?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["status_type"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          branch_id?: number | null
          class_type_id?: number | null
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: number
          instructor_id?: number | null
          max_participants?: number | null
          room?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["status_type"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_class_type_id_fkey"
            columns: ["class_type_id"]
            isOneToOne: false
            referencedRelation: "class_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: Json | null
          cnpj: string | null
          created_at: string | null
          email: string | null
          id: number
          logo_url: string | null
          name: string
          owner_id: string | null
          phone: string | null
          status: Database["public"]["Enums"]["status_type"] | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          logo_url?: string | null
          name: string
          owner_id?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_plans: {
        Row: {
          billing_cycle: string | null
          company_id: number | null
          created_at: string | null
          features: Json | null
          id: number
          max_branches: number | null
          max_staff: number | null
          max_students: number | null
          plan_type: Database["public"]["Enums"]["saas_plan_type"]
          price: number | null
          status: Database["public"]["Enums"]["status_type"] | null
        }
        Insert: {
          billing_cycle?: string | null
          company_id?: number | null
          created_at?: string | null
          features?: Json | null
          id?: number
          max_branches?: number | null
          max_staff?: number | null
          max_students?: number | null
          plan_type: Database["public"]["Enums"]["saas_plan_type"]
          price?: number | null
          status?: Database["public"]["Enums"]["status_type"] | null
        }
        Update: {
          billing_cycle?: string | null
          company_id?: number | null
          created_at?: string | null
          features?: Json | null
          id?: number
          max_branches?: number | null
          max_staff?: number | null
          max_students?: number | null
          plan_type?: Database["public"]["Enums"]["saas_plan_type"]
          price?: number | null
          status?: Database["public"]["Enums"]["status_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "company_plans_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          code: string
          company_id: number | null
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          max_uses: number | null
          min_amount: number | null
          type: string | null
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
          value: number | null
        }
        Insert: {
          code: string
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          max_uses?: number | null
          min_amount?: number | null
          type?: string | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
          value?: number | null
        }
        Update: {
          code?: string
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          max_uses?: number | null
          min_amount?: number | null
          type?: string | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          category: string | null
          company_id: number | null
          created_at: string | null
          created_by: number | null
          difficulty_level: number | null
          equipment: string[] | null
          id: number
          image_url: string | null
          instructions: string | null
          is_global: boolean | null
          muscle_groups: string[] | null
          name: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          company_id?: number | null
          created_at?: string | null
          created_by?: number | null
          difficulty_level?: number | null
          equipment?: string[] | null
          id?: number
          image_url?: string | null
          instructions?: string | null
          is_global?: boolean | null
          muscle_groups?: string[] | null
          name: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          company_id?: number | null
          created_at?: string | null
          created_by?: number | null
          difficulty_level?: number | null
          equipment?: string[] | null
          id?: number
          image_url?: string | null
          instructions?: string | null
          is_global?: boolean | null
          muscle_groups?: string[] | null
          name?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          company_id: number | null
          config: Json | null
          created_at: string | null
          credentials: Json | null
          id: number
          is_active: boolean | null
          last_sync: string | null
          service_name: string
          updated_at: string | null
        }
        Insert: {
          company_id?: number | null
          config?: Json | null
          created_at?: string | null
          credentials?: Json | null
          id?: number
          is_active?: boolean | null
          last_sync?: string | null
          service_name: string
          updated_at?: string | null
        }
        Update: {
          company_id?: number | null
          config?: Json | null
          created_at?: string | null
          credentials?: Json | null
          id?: number
          is_active?: boolean | null
          last_sync?: string | null
          service_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          due_date: string | null
          id: number
          invoice_number: string
          items: Json | null
          paid_at: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          student_id: number | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          due_date?: string | null
          id?: number
          invoice_number: string
          items?: Json | null
          paid_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: number | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          due_date?: string | null
          id?: number
          invoice_number?: string
          items?: Json | null
          paid_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: number | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      login_history: {
        Row: {
          company_id: number | null
          created_at: string | null
          device_info: Json | null
          failure_reason: string | null
          id: number
          ip_address: unknown | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          device_info?: Json | null
          failure_reason?: string | null
          id?: number
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          device_info?: Json | null
          failure_reason?: string | null
          id?: number
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "login_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "login_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          company_id: number | null
          created_at: string | null
          id: number
          message: string
          metadata: Json | null
          recipient: string | null
          sent_at: string | null
          status: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"] | null
          user_id: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          message: string
          metadata?: Json | null
          recipient?: string | null
          sent_at?: string | null
          status?: string | null
          title: string
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          message?: string
          metadata?: Json | null
          recipient?: string | null
          sent_at?: string | null
          status?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          due_date: string | null
          id: number
          notes: string | null
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          plan_id: number | null
          status: Database["public"]["Enums"]["payment_status"] | null
          student_id: number | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: number
          notes?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          plan_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: number | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: number
          notes?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          plan_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: number | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "student_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cpf: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: Database["public"]["Enums"]["user_role"]
          permissions: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: Database["public"]["Enums"]["user_role"]
          permissions?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: Database["public"]["Enums"]["user_role"]
          permissions?: Json | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          branch_id: number | null
          company_id: number | null
          created_at: string | null
          cref: string | null
          employee_id: string | null
          hire_date: string | null
          id: number
          position: string | null
          salary: number | null
          specialties: string[] | null
          status: Database["public"]["Enums"]["status_type"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          branch_id?: number | null
          company_id?: number | null
          created_at?: string | null
          cref?: string | null
          employee_id?: string | null
          hire_date?: string | null
          id?: number
          position?: string | null
          salary?: number | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          branch_id?: number | null
          company_id?: number | null
          created_at?: string | null
          cref?: string | null
          employee_id?: string | null
          hire_date?: string | null
          id?: number
          position?: string | null
          salary?: number | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_plans: {
        Row: {
          class_credits: number | null
          company_id: number | null
          created_at: string | null
          description: string | null
          duration_days: number | null
          features: Json | null
          id: number
          is_active: boolean | null
          name: string
          price: number
          type: string | null
        }
        Insert: {
          class_credits?: number | null
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          name: string
          price: number
          type?: string | null
        }
        Update: {
          class_credits?: number | null
          company_id?: number | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          name?: string
          price?: number
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_plans_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          body_measurements: Json | null
          created_at: string | null
          experience_level: string | null
          goal: string | null
          id: number
          medical_clearance: boolean | null
          notes: string | null
          physical_limitations: string | null
          preferences: Json | null
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          body_measurements?: Json | null
          created_at?: string | null
          experience_level?: string | null
          goal?: string | null
          id?: number
          medical_clearance?: boolean | null
          notes?: string | null
          physical_limitations?: string | null
          preferences?: Json | null
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          body_measurements?: Json | null
          created_at?: string | null
          experience_level?: string | null
          goal?: string | null
          id?: number
          medical_clearance?: boolean | null
          notes?: string | null
          physical_limitations?: string | null
          preferences?: Json | null
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          created_at: string | null
          date: string
          difficulty_rating: number | null
          duration_minutes: number | null
          exercise_id: number | null
          id: number
          notes: string | null
          reps_completed: string | null
          sets_completed: number | null
          student_id: number | null
          weight_used: number | null
          workout_id: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          difficulty_rating?: number | null
          duration_minutes?: number | null
          exercise_id?: number | null
          id?: number
          notes?: string | null
          reps_completed?: string | null
          sets_completed?: number | null
          student_id?: number | null
          weight_used?: number | null
          workout_id?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          difficulty_rating?: number | null
          duration_minutes?: number | null
          exercise_id?: number | null
          id?: number
          notes?: string | null
          reps_completed?: string | null
          sets_completed?: number | null
          student_id?: number | null
          weight_used?: number | null
          workout_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          birth_date: string | null
          branch_id: number | null
          company_id: number | null
          created_at: string | null
          emergency_contact: Json | null
          gender: string | null
          id: number
          medical_info: Json | null
          status: Database["public"]["Enums"]["status_type"] | null
          student_code: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          birth_date?: string | null
          branch_id?: number | null
          company_id?: number | null
          created_at?: string | null
          emergency_contact?: Json | null
          gender?: string | null
          id?: number
          medical_info?: Json | null
          status?: Database["public"]["Enums"]["status_type"] | null
          student_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          birth_date?: string | null
          branch_id?: number | null
          company_id?: number | null
          created_at?: string | null
          emergency_contact?: Json | null
          gender?: string | null
          id?: number
          medical_info?: Json | null
          status?: Database["public"]["Enums"]["status_type"] | null
          student_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          company_id: number | null
          created_at: string | null
          currency: string | null
          expires_at: string | null
          id: number
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          plan_id: number | null
          status: Database["public"]["Enums"]["payment_status"] | null
        }
        Insert: {
          amount: number
          company_id?: number | null
          created_at?: string | null
          currency?: string | null
          expires_at?: string | null
          id?: number
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          plan_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Update: {
          amount?: number
          company_id?: number | null
          created_at?: string | null
          currency?: string | null
          expires_at?: string | null
          id?: number
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          plan_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "company_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          branch_id: number | null
          company_id: number | null
          created_at: string | null
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          branch_id?: number | null
          company_id?: number | null
          created_at?: string | null
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          branch_id?: number | null
          company_id?: number | null
          created_at?: string | null
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_roles_branch"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_roles_company"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          company_id: number | null
          created_at: string | null
          event_type: string | null
          id: number
          payload: Json | null
          processed: boolean | null
          processed_at: string | null
          source: string
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          event_type?: string | null
          id?: number
          payload?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          source: string
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          event_type?: string | null
          id?: number
          payload?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercises: {
        Row: {
          created_at: string | null
          exercise_id: number | null
          id: number
          notes: string | null
          order_position: number | null
          reps: string | null
          rest_seconds: number | null
          sets: number | null
          weight: number | null
          workout_id: number | null
        }
        Insert: {
          created_at?: string | null
          exercise_id?: number | null
          id?: number
          notes?: string | null
          order_position?: number | null
          reps?: string | null
          rest_seconds?: number | null
          sets?: number | null
          weight?: number | null
          workout_id?: number | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number | null
          id?: number
          notes?: string | null
          order_position?: number | null
          reps?: string | null
          rest_seconds?: number | null
          sets?: number | null
          weight?: number | null
          workout_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string | null
          description: string | null
          duration_weeks: number | null
          frequency_per_week: number | null
          goal: string | null
          id: number
          instructor_id: number | null
          is_active: boolean | null
          student_id: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_weeks?: number | null
          frequency_per_week?: number | null
          goal?: string | null
          id?: number
          instructor_id?: number | null
          is_active?: boolean | null
          student_id?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_weeks?: number | null
          frequency_per_week?: number | null
          goal?: string | null
          id?: number
          instructor_id?: number | null
          is_active?: boolean | null
          student_id?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { company_id_param?: number; user_id: string }
        Returns: {
          branch_id: number
          company_id: number
          role_name: string
        }[]
      }
      has_role: {
        Args: { _company_id?: number; _role: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      class_type:
        | "musculacao"
        | "funcional"
        | "yoga"
        | "pilates"
        | "crossfit"
        | "spinning"
        | "danca"
        | "natacao"
        | "luta"
        | "outros"
      notification_type: "whatsapp" | "email" | "sms" | "push"
      payment_method:
        | "credit_card"
        | "debit_card"
        | "pix"
        | "boleto"
        | "cash"
        | "transfer"
      payment_status: "pending" | "paid" | "failed" | "refunded" | "cancelled"
      saas_plan_type: "personal" | "studio" | "rede"
      status_type: "active" | "inactive" | "suspended" | "pending"
      user_role:
        | "proprietario"
        | "gestor"
        | "recepcionista"
        | "professor"
        | "aluno"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      class_type: [
        "musculacao",
        "funcional",
        "yoga",
        "pilates",
        "crossfit",
        "spinning",
        "danca",
        "natacao",
        "luta",
        "outros",
      ],
      notification_type: ["whatsapp", "email", "sms", "push"],
      payment_method: [
        "credit_card",
        "debit_card",
        "pix",
        "boleto",
        "cash",
        "transfer",
      ],
      payment_status: ["pending", "paid", "failed", "refunded", "cancelled"],
      saas_plan_type: ["personal", "studio", "rede"],
      status_type: ["active", "inactive", "suspended", "pending"],
      user_role: [
        "proprietario",
        "gestor",
        "recepcionista",
        "professor",
        "aluno",
      ],
    },
  },
} as const
