
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { navigationConfig } from '@/config/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const AppSidebar: React.FC = () => {
  const { user, switchProfile } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const profiles = [
    { value: 'administrador', label: 'Administrador' },
    { value: 'gestor', label: 'Gestor' },
    { value: 'instrutor', label: 'Instrutor' },
    { value: 'recepcionista', label: 'Recepcionista' },
    { value: 'aluno', label: 'Aluno' }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  if (!user) return null;

  const userNavigation = navigationConfig[user.profile] || [];

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-sidebar font-bold text-sm">W</span>
          </div>
          <h2 className="text-lg font-bold text-sidebar-foreground">Wefit</h2>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wide">
            Perfil Ativo
          </label>
          <select
            value={user.profile}
            onChange={(e) => switchProfile(e.target.value as any)}
            className="w-full bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
          >
            {profiles.map((profile) => (
              <option key={profile.value} value={profile.value}>
                {profile.label}
              </option>
            ))}
          </select>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {userNavigation.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex}>
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wide">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveRoute(item.href)}
                      className={`
                        w-full justify-start px-3 py-2 rounded-md transition-colors duration-200
                        ${isActiveRoute(item.href) 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <button onClick={() => handleNavigation(item.href)} className="flex items-center space-x-3 w-full">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/70 text-center">
          Wefit v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
