
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from 'lucide-react';

interface CompanySettingsProps {
  companyName: string;
  logoPreview: string | null;
  onCompanyNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanySettings = ({
  companyName,
  logoPreview,
  onCompanyNameChange,
  onLogoUpload
}: CompanySettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company-name">Nome da empresa</Label>
        <Input 
          id="company-name" 
          value={companyName}
          onChange={onCompanyNameChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Logo da empresa</Label>
        <div className="flex flex-col space-y-3">
          {logoPreview && (
            <div className="border p-4 rounded-md bg-muted/20 flex items-center justify-center">
              <img 
                src={logoPreview} 
                alt="Logo da empresa" 
                className="max-h-20 max-w-full object-contain"
              />
            </div>
          )}
          <div className="flex items-center">
            <Label 
              htmlFor="logo-upload" 
              className="cursor-pointer flex items-center gap-2 py-2 px-4 bg-muted rounded-md hover:bg-muted/80 transition-colors"
            >
              <Upload size={16} />
              <span>Upload do logo</span>
              <Input 
                id="logo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={onLogoUpload}
              />
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Formatos suportados: PNG, JPG, SVG. Tamanho máximo: 2MB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
