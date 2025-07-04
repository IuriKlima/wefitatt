
import { supabase } from '@/integrations/supabase/client';

export const wefitApi = {
  // Criar empresa
  async createCompany(companyData: {
    name: string;
    email?: string;
    phone?: string;
    cnpj?: string;
    address?: any;
  }) {
    const { data, error } = await supabase.rpc('create_company_with_owner' as any, {
      company_name: companyData.name,
      company_email: companyData.email,
      company_phone: companyData.phone,
      company_cnpj: companyData.cnpj,
      company_address: companyData.address,
    });
    return { data, error };
  },

  // Criar filial
  async createBranch(branchData: {
    company_id: number;
    name: string;
    address?: any;
    phone?: string;
    email?: string;
    operating_hours?: any;
  }) {
    const { data, error } = await supabase.rpc('create_branch' as any, {
      company_id_param: branchData.company_id,
      branch_name: branchData.name,
      branch_address: branchData.address,
      branch_phone: branchData.phone,
      branch_email: branchData.email,
      operating_hours_param: branchData.operating_hours,
    });
    return { data, error };
  },

  // Registrar aluno
  async registerStudent(studentData: {
    company_id: number;
    branch_id: number;
    name: string;
    email: string;
    phone?: string;
    cpf?: string;
    birth_date?: string;
    gender?: string;
    emergency_contact?: any;
    goal?: string;
  }) {
    const { data, error } = await supabase.rpc('register_student' as any, {
      company_id_param: studentData.company_id,
      branch_id_param: studentData.branch_id,
      student_name: studentData.name,
      student_email: studentData.email,
      student_phone: studentData.phone,
      student_cpf: studentData.cpf,
      birth_date_param: studentData.birth_date,
      gender_param: studentData.gender,
      emergency_contact_param: studentData.emergency_contact,
      goal_param: studentData.goal,
    });
    return { data, error };
  },

  // Agendar aula
  async scheduleClass(classData: {
    company_id: number;
    branch_id: number;
    class_type_id: number;
    instructor_id: number;
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    max_participants?: number;
    room?: string;
  }) {
    const { data, error } = await supabase.rpc('schedule_class' as any, {
      company_id_param: classData.company_id,
      branch_id_param: classData.branch_id,
      class_type_id_param: classData.class_type_id,
      instructor_id_param: classData.instructor_id,
      class_title: classData.title,
      class_description: classData.description,
      start_time_param: classData.start_time,
      end_time_param: classData.end_time,
      max_participants_param: classData.max_participants,
      room_param: classData.room,
    });
    return { data, error };
  },

  // Inscrever aluno em aula
  async enrollStudentInClass(classId: number, studentId: number) {
    const { data, error } = await supabase.rpc('enroll_student_in_class' as any, {
      class_id_param: classId,
      student_id_param: studentId,
    });
    return { data, error };
  },

  // Obter resumo diário
  async getDailySummary(branchId: number, date?: string) {
    const { data, error } = await supabase.rpc('get_daily_summary' as any, {
      branch_id_param: branchId,
      summary_date: date,
    });
    return { data, error };
  },

  // Enviar notificação
  async sendNotification(notificationData: {
    company_id: number;
    user_id: string;
    type: 'whatsapp' | 'email' | 'sms' | 'push';
    title: string;
    message: string;
    recipient?: string;
  }) {
    const { data, error } = await supabase.rpc('send_notification' as any, {
      company_id_param: notificationData.company_id,
      user_id_param: notificationData.user_id,
      notification_type_param: notificationData.type,
      title_param: notificationData.title,
      message_param: notificationData.message,
      recipient_param: notificationData.recipient,
    });
    return { data, error };
  },

  // Funções de consulta direta
  async getCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getBranches(companyId: number) {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getStudents(companyId: number, branchId?: number) {
    let query = supabase
      .from('students')
      .select(`
        *,
        profiles:user_id (full_name, email, phone),
        student_profiles (goal, experience_level, notes)
      `)
      .eq('company_id', companyId);

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  async getClasses(companyId: number, branchId?: number) {
    let query = supabase
      .from('classes')
      .select(`
        *,
        class_types (name, category),
        staff:instructor_id (id, profiles:user_id (full_name))
      `)
      .eq('company_id', companyId);

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    const { data, error } = await query
      .order('start_time', { ascending: true });
    return { data, error };
  },

  async getPayments(companyId: number) {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        students (
          id,
          student_code,
          profiles:user_id (full_name, email)
        )
      `)
      .eq('students.company_id', companyId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};
