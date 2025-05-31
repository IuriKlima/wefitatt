
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, RefreshCw } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'Administrador' | 'Gestor' | 'Instrutor' | 'Recepcionista';
  unidade?: string;
  dataCadastro: string;
  status: 'Ativo' | 'Inativo';
}

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  editingUser: Usuario | null;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onGeneratePassword: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onClose,
  isEditing,
  editingUser,
  form,
  onSubmit,
  onGeneratePassword,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {isEditing ? `Editar Usuário: ${editingUser?.nome}` : 'Adicionar Novo Usuário do Sistema'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edite as informações do usuário' : 'Preencha as informações do novo usuário'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="joao.silva@wefit.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isEditing && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        Senha
                        <Button type="button" variant="ghost" size="sm" onClick={onGeneratePassword}>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Gerar
                        </Button>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Senha forte" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmarSenha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirme a senha" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {isEditing && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Para redefinir a senha deste usuário, um link será enviado para o email cadastrado.
                </p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Enviar Link de Redefinição
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="perfil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil/Nível de Acesso</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o perfil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Gestor">Gestor</SelectItem>
                        <SelectItem value="Instrutor">Instrutor</SelectItem>
                        <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade Associada</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={form.watch('perfil') === 'Administrador'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Wefit Centro">Wefit Centro</SelectItem>
                        <SelectItem value="Wefit Paulista">Wefit Paulista</SelectItem>
                        <SelectItem value="Wefit Ipanema">Wefit Ipanema</SelectItem>
                        <SelectItem value="Wefit Bela Vista">Wefit Bela Vista</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? 'Atualizar Usuário' : 'Salvar Usuário'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
