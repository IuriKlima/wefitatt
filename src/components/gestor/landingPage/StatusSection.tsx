
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy } from 'lucide-react';
import { LandingPageConfig } from '@/types/landingPage';

interface StatusSectionProps {
  config: LandingPageConfig;
  onCopyUrl: () => void;
}

const StatusSection: React.FC<StatusSectionProps> = ({ config, onCopyUrl }) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Status:</p>
            <Badge variant={config.status === 'published' ? 'default' : 'secondary'}>
              {config.status === 'published' 
                ? `Publicada em: ${config.publishedDate}` 
                : 'Rascunho'
              }
            </Badge>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium">URL da Página</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input 
              value="https://wefit.com/unidade/wefit-centro" 
              readOnly 
              className="bg-gray-100"
            />
            <Button size="sm" variant="outline" onClick={onCopyUrl}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusSection;
