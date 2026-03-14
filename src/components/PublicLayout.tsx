import React from 'react';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import WhatsAppFloat from './WhatsAppFloat';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-tech text-white">
      <PublicHeader />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
      <WhatsAppFloat />
    </div>
  );
};

export default PublicLayout;
