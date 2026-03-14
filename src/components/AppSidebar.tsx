
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
import { Zap } from 'lucide-react';

const AppSidebar: React.FC = () => {
  const { user, switchProfile } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const profiles = [
    { value: 'super_admin', label: 'Super Admin' },
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
      {/* Logo Area */}
      <SidebarHeader className="p-5 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-sidebar" />
          </div>
          <div>
            <span className="text-lg font-bold text-sidebar-foreground tracking-tight">WeFit</span>
            <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-medium">PRO</span>
          </div>
        </div>

        {/* Profile Switcher */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
            Perfil
          </label>
          <select
            value={user.profile}
            onChange={(e) => switchProfile(e.target.value as any)}
            className="w-full bg-sidebar-accent/60 text-sidebar-accent-foreground border border-sidebar-border/50 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-200 cursor-pointer hover:bg-sidebar-accent"
          >
            {profiles.map((profile) => (
              <option key={profile.value} value={profile.value}>
                {profile.label}
              </option>
            ))}
          </select>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3">
        {userNavigation.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex} className="mb-1">
            <SidebarGroupLabel className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 mb-1">
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
                        w-full justify-start px-3 py-2 rounded-lg transition-all duration-200 group
                        ${isActiveRoute(item.href)
                          ? 'bg-gradient-to-r from-purple-500/15 to-indigo-500/10 text-purple-400 border border-purple-500/20 shadow-sm shadow-purple-500/5'
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/80'
                        }
                      `}
                    >
                      <button onClick={() => handleNavigation(item.href)} className="flex items-center gap-3 w-full">
                        <item.icon className={`h-[18px] w-[18px] flex-shrink-0 transition-colors duration-200 ${
                          isActiveRoute(item.href) ? 'text-purple-400' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'
                        }`} />
                        <span className="flex-1 text-left text-[13px] font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto h-5 min-w-[20px] flex items-center justify-center rounded-full bg-purple-500/15 text-purple-400 text-[10px] font-bold border-0 px-1.5">
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

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-sidebar-foreground/40 font-medium">WeFit Platform</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">v2.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
