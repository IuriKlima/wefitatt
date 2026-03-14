import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  SortableContext as VerticalSortableContext,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal, User, DollarSign, Calendar, Mail, Phone, Clock } from 'lucide-react';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  score?: number;
  stage_id: string;
  created_at: string;
}

interface Stage {
  id: string;
  name: string;
  color: string;
  order_index: number;
}

// --- Components ---
const SortableLeadCard = ({ lead, onClick }: { lead: Lead, onClick: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: lead.id, data: { type: 'Lead', lead } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="h-[120px] w-full rounded-lg bg-sidebar-accent/50 border-2 border-dashed border-sidebar-border" 
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`p-3 mb-2 cursor-grab active:cursor-grabbing hover:border-purple-500/30 transition-colors bg-card/60 backdrop-blur-sm shadow-sm ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm truncate pr-2">{lead.name}</h4>
        <div className="flex -space-x-1">
          {lead.score && <Badge variant="outline" className="text-[10px] h-4 px-1 border-purple-500/20 text-purple-400 bg-purple-500/10">🔥 {lead.score}</Badge>}
        </div>
      </div>
      
      <div className="space-y-1.5 mb-3">
        {lead.phone && (
          <div className="flex items-center text-[11px] text-muted-foreground">
            <Phone className="h-3 w-3 mr-1.5" /> {lead.phone}
          </div>
        )}
        {lead.email && (
          <div className="flex items-center text-[11px] text-muted-foreground truncate">
            <Mail className="h-3 w-3 mr-1.5 flex-shrink-0" /> <span className="truncate">{lead.email}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/50">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
        </div>
        <Badge variant="secondary" className="text-[9px] px-1.5 h-4 capitalize bg-secondary/50">
          {lead.source || 'Manual'}
        </Badge>
      </div>
    </Card>
  );
};

const Column = ({ 
  stage, 
  leads, 
  onLeadClick 
}: { 
  stage: Stage, 
  leads: Lead[], 
  onLeadClick: (l: Lead) => void 
}) => {
  return (
    <div className="flex flex-col w-[320px] min-w-[320px] bg-sidebar/30 border border-sidebar-border/50 rounded-xl overflow-hidden h-full">
      <div className="p-3 bg-sidebar/50 border-b border-sidebar-border/50 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
          <h3 className="font-bold text-sm tracking-tight">{stage.name}</h3>
          <Badge variant="secondary" className="ml-1 h-5 text-[10px] bg-background/50">{leads.length}</Badge>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="p-2 overflow-y-auto flex-1 h-full min-h-[150px]">
        <SortableContext 
          id={stage.id}
          items={leads.map(l => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map(lead => (
            <SortableLeadCard 
              key={lead.id} 
              lead={lead} 
              onClick={() => onLeadClick(lead)} 
            />
          ))}
        </SortableContext>
        
        {leads.length === 0 && (
          <div className="h-full flex items-center justify-center p-4">
            <div className="text-center rounded-lg border border-dashed border-border/50 p-6 w-full">
              <p className="text-xs text-muted-foreground/50 font-medium">Arraste leads para cá</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CRM = () => {
  const { toast } = useToast();
  const [stages, setStages] = useState<Stage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    // Simulated data fetching (assuming backend is not connected yet for these specific endpoints)
    // We will replace this with actual API calls once supabase is populated.
    const fetchKanbanData = async () => {
      try {
        setLoading(true);
        // MOCK DATA for now to build UI
        const mockStages = [
          { id: '1', name: 'Lead Frio', color: '#94a3b8', order_index: 0 },
          { id: '2', name: 'Contato Feito', color: '#3b82f6', order_index: 1 },
          { id: '3', name: 'Aula Experimental', color: '#f59e0b', order_index: 2 },
          { id: '4', name: 'Negociação', color: '#8b5cf6', order_index: 3 },
          { id: '5', name: 'Fechado/Ganho', color: '#10b981', order_index: 4 },
        ];
        
        const mockLeads = [
          { id: 'l1', name: 'Lucas Silva', phone: '11999999999', email: 'lucas@gmail.com', source: 'Instagram', score: 85, stage_id: '1', created_at: new Date().toISOString() },
          { id: 'l2', name: 'Mariana Souza', phone: '11988888888', source: 'Landing Page', score: 92, stage_id: '1', created_at: new Date(Date.now() - 86400000).toISOString() },
          { id: 'l3', name: 'Pedro Alves', email: 'pedro@hotmail.com', source: 'Referência', score: 45, stage_id: '2', created_at: new Date(Date.now() - 172800000).toISOString() },
          { id: 'l4', name: 'Ana Costa', phone: '11977777777', email: 'ana@empresa.com', source: 'WhatsApp', score: 99, stage_id: '3', created_at: new Date(Date.now() - 259200000).toISOString() },
        ];

        setStages(mockStages);
        setLeads(mockLeads);
      } catch (error) {
        toast({ title: "Erro", description: "Falha ao carregar funil de vendas", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchKanbanData();
  }, [toast]);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const lead = leads.find(l => l.id === active.id);
    if (lead) setActiveLead(lead);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveLead(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id; // Could be a stage ID or a lead ID
    
    // Find the lead being dragged
    const activeLeadItem = leads.find(l => l.id === activeId);
    if (!activeLeadItem) return;

    // Determine target stage
    let targetStageId = overId;
    const overLeadItem = leads.find(l => l.id === overId);
    if (overLeadItem) {
      targetStageId = overLeadItem.stage_id;
    }

    // If moved to a different stage
    if (activeLeadItem.stage_id !== targetStageId) {
      setLeads(prev => prev.map(l => 
        l.id === activeId ? { ...l, stage_id: targetStageId as string } : l
      ));
      
      toast({
        title: "Lead Movido",
        description: `${activeLeadItem.name} foi movido com sucesso.`,
      });
    }
  };

  if (loading) {
    return <div className="flex h-[calc(100vh-100px)] items-center justify-center">Carregando CRM...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Funil de Vendas</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestão de leads e conversão de novos alunos</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar leads..." 
              className="pl-9 h-10 bg-background/50 border-border/50"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 h-10">
            <Plus className="h-4 w-4 mr-2" /> Novo Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-full items-start">
            {stages.map(stage => {
              const stageLeads = leads.filter(l => l.stage_id === stage.id);
              return (
                <Column 
                  key={stage.id} 
                  stage={stage} 
                  leads={stageLeads} 
                  onLeadClick={(lead) => console.log('Clicked', lead)} 
                />
              );
            })}
          </div>

          {/* Dragging Overlay */}
          <DragOverlay>
            {activeLead ? (
              <div className="rotate-3 scale-105 shadow-xl shadow-purple-500/10 cursor-grabbing">
                <SortableLeadCard lead={activeLead} onClick={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default CRM;
