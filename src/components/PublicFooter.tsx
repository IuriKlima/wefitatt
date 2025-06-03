
import React from 'react';
import { Link } from 'react-router-dom';
import { facebook, instagram, linkedin } from 'lucide-react';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Wefit</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              A plataforma completa para gestão inteligente de academias. 
              Transforme seu negócio fitness com tecnologia de ponta.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <span className="text-xl">📷</span>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <span className="text-xl">📘</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/politica-privacidade" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-uso" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:contato@wefit.com.br" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  contato@wefit.com.br
                </a>
              </li>
              <li>
                <a 
                  href="tel:+5519993070799" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  (19) 99307-0799
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Wefit - Sistema inteligente para academias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
