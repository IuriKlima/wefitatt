import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090f] p-8">
      <div className="text-center animate-fade-in">
        <div className="h-16 w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
          <Zap className="h-8 w-8 text-purple-400" />
        </div>
        <h1 className="text-7xl font-extrabold text-white mb-2 tracking-tight">404</h1>
        <p className="text-xl text-gray-400 mb-8">Página não encontrada</p>
        <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-8 h-12">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
