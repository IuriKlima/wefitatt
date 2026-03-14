import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-tech border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">WeFit</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-sm leading-relaxed text-sm">
              A plataforma de elite para gestão inteligente de academias. 
              Tecnologia, IA e Analytics integrados em um ecossistema premium.
            </p>
            <div className="flex gap-3">
              {['📷', '📘', '💼'].map((emoji, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
                  <span className="text-sm">{emoji}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Navegação</h4>
            <ul className="space-y-3">
              {[
                { name: 'Início', href: '/' },
                { name: 'Planos', href: '/planos' },
                { name: 'Sobre Nós', href: '/sobre' },
                { name: 'Contato', href: '/contato' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Legal & Contato</h4>
            <ul className="space-y-3">
              <li><Link to="/politica-privacidade" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Política de Privacidade</Link></li>
              <li><Link to="/termos-uso" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Termos de Uso</Link></li>
              <li><a href="mailto:contato@wefit.com.br" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">contato@wefit.com.br</a></li>
              <li><a href="tel:+5519993070799" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">(19) 99307-0799</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {currentYear} WeFit Platform. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-600">Todos os sistemas operacionais</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
