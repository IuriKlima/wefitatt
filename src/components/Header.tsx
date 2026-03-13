
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Bell, Search, Settings, LogOut, Command } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({ title: "Logout realizado", description: "Até logo!" });
      navigate('/login');
    } catch (error) {
      toast({ title: "Erro ao fazer logout", description: "Tente novamente", variant: "destructive" });
    }
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    return user?.email?.split('@')[0] || 'Usuário';
  };

  const getUserInitials = () => {
    const name = getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between px-6 py-2.5">
        {/* Search */}
        <div className="flex items-center">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 h-4 w-4 transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-72 bg-muted/50 rounded-lg text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 focus:bg-muted transition-all duration-200 placeholder:text-muted-foreground/50"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-background border border-border text-[10px] text-muted-foreground font-mono">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg hover:bg-muted/80 transition-colors">
            <Bell className="h-[18px] w-[18px] text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1 shadow-lg shadow-red-500/30">
              3
            </span>
          </Button>

          {/* Divider */}
          <div className="h-6 w-px bg-border/60 mx-1" />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 rounded-lg px-2 hover:bg-muted/80 gap-2.5 transition-colors">
                <Avatar className="h-7 w-7 rounded-lg">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-foreground/90">{getUserName()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-3">
                <p className="text-sm font-semibold leading-none">{getUserName()}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem onClick={() => navigate('/admin/configuracoes')} className="cursor-pointer focus:bg-muted/80">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
