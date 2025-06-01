
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface UserFiltersProps {
  busca: string;
  filtroPerfil: string;
  filtroStatus: string;
  filtroUnidade: string;
  onBuscaChange: (value: string) => void;
  onPerfilChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onUnidadeChange: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  busca,
  filtroPerfil,
  filtroStatus,
  filtroUnidade,
  onBuscaChange,
  onPerfilChange,
  onStatusChange,
  onUnidadeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={filtroPerfil} onValueChange={onPerfilChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Administrador">Administrador</SelectItem>
          <SelectItem value="Gestor">Gestor</SelectItem>
          <SelectItem value="Instrutor">Instrutor</SelectItem>
          <SelectItem value="Recepcionista">Recepcionista</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filtroStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Inativo">Inativo</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filtroUnidade} onValueChange={onUnidadeChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Unidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas</SelectItem>
          <SelectItem value="Wefit Centro">Wefit Centro</SelectItem>
          <SelectItem value="Wefit Paulista">Wefit Paulista</SelectItem>
          <SelectItem value="Wefit Ipanema">Wefit Ipanema</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserFilters;
