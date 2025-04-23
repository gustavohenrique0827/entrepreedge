
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SegmentSettingsProps {
  segment: string;
  onSegmentChange: (value: string) => void;
  onApplyRecommendations: () => void;
}

const SegmentSettings = ({
  segment,
  onSegmentChange,
  onApplyRecommendations
}: SegmentSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="segment">Segmento de atuação</Label>
        <Select value={segment} onValueChange={onSegmentChange}>
          <SelectTrigger id="segment">
            <SelectValue placeholder="Selecione o segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="generic">Genérico</SelectItem>
            <SelectItem value="financial">Financeiro</SelectItem>
            <SelectItem value="healthcare">Saúde</SelectItem>
            <SelectItem value="education">Educação</SelectItem>
            <SelectItem value="ecommerce">E-Commerce</SelectItem>
            <SelectItem value="manufacturing">Indústria</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 w-full" 
          onClick={onApplyRecommendations}
          type="button"
        >
          Aplicar cores recomendadas para este segmento
        </Button>
      </div>
    </div>
  );
};

export default SegmentSettings;
