
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {Icon && <Icon className="h-8 w-8 text-wefit-primary" />}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>

      <Card className="wefit-card">
        <CardHeader>
          <CardTitle className="text-xl text-wefit-primary">Página em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-wefit-primary to-wefit-accent rounded-full flex items-center justify-center mb-6">
              {Icon && <Icon className="h-12 w-12 text-white" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Esta funcionalidade está sendo desenvolvida e estará disponível em breve. 
              Estamos trabalhando para oferecer a melhor experiência possível.
            </p>
            <div className="mt-6 p-4 bg-wefit-primary/5 rounded-lg">
              <p className="text-sm text-wefit-primary font-medium">
                💡 Em breve: Interface completa com todas as funcionalidades
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
