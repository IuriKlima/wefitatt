import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Planos', href: '/planos' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Contato', href: '/contato' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              WeFit
              <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-medium align-top">PRO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/5">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 transition-all">
              <Link to="/cadastro">Começar Grátis</Link>
            </Button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                <Button asChild variant="ghost" size="sm" className="flex-1 text-gray-300 hover:text-white border border-white/10">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 bg-purple-600 hover:bg-purple-500 text-white">
                  <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>Começar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
