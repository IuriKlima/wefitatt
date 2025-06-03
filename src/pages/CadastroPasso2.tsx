
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const CadastroPasso2 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar automaticamente para o novo fluxo de cadastro
    const profile = searchParams.get('profile');
    const inviteCode = searchParams.get('inviteCode');
    
    if (profile || inviteCode) {
      const params = new URLSearchParams();
      if (profile) params.set('profile', profile);
      if (inviteCode) params.set('inviteCode', inviteCode);
      
      navigate(`/cadastro-fluxo?${params.toString()}`, { replace: true });
    } else {
      navigate('/cadastro', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    </div>
  );
};

export default CadastroPasso2;
