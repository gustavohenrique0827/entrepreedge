
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Printer, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PayslipData {
  id: number;
  employee: string;
  period: string;
  status: string;
  amount: string;
  department: string;
}

interface PayslipViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payslip: PayslipData | null;
}

export function PayslipViewDialog({ open, onOpenChange, payslip }: PayslipViewDialogProps) {
  const { toast } = useToast();

  if (!payslip) {
    return null;
  }

  const handleDownload = () => {
    toast({
      title: "Download Iniciado",
      description: `O download do holerite de ${payslip.employee} foi iniciado.`,
    });
    onOpenChange(false);
  };

  const handlePrint = () => {
    toast({
      title: "Imprimindo",
      description: `O holerite de ${payslip.employee} foi enviado para impressão.`,
    });
    onOpenChange(false);
  };

  const handleSendEmail = () => {
    toast({
      title: "E-mail Enviado",
      description: `O holerite foi enviado por e-mail para ${payslip.employee}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Holerite</DialogTitle>
          <DialogDescription>
            Informações completas do holerite do colaborador.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Holerite #{payslip.id}</h3>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {payslip.status}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Colaborador</p>
              <p className="font-medium">{payslip.employee}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Departamento</p>
              <p className="font-medium">{payslip.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Período</p>
              <p className="font-medium">{payslip.period}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor</p>
              <p className="font-medium">{payslip.amount}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">Detalhamentos</h4>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr>
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-right py-2">Referência</th>
                  <th className="text-right py-2">Proventos</th>
                  <th className="text-right py-2">Descontos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Salário Base</td>
                  <td className="text-right">30 dias</td>
                  <td className="text-right text-green-600">{payslip.amount}</td>
                  <td className="text-right">-</td>
                </tr>
                <tr>
                  <td className="py-2">INSS</td>
                  <td className="text-right">11%</td>
                  <td className="text-right">-</td>
                  <td className="text-right text-red-600">R$ 462,00</td>
                </tr>
                <tr>
                  <td className="py-2">IRRF</td>
                  <td className="text-right">7.5%</td>
                  <td className="text-right">-</td>
                  <td className="text-right text-red-600">R$ 315,00</td>
                </tr>
                <tr>
                  <td className="py-2">Vale Transporte</td>
                  <td className="text-right">6%</td>
                  <td className="text-right">-</td>
                  <td className="text-right text-red-600">R$ 252,00</td>
                </tr>
              </tbody>
              <tfoot className="border-t">
                <tr className="font-medium">
                  <td className="py-2">Total Líquido</td>
                  <td className="text-right"></td>
                  <td className="text-right text-green-600">R$ 4.200,00</td>
                  <td className="text-right text-red-600">R$ 1.029,00</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2">Valor a Receber</td>
                  <td className="text-right" colSpan={3}>R$ 3.171,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendEmail} className="gap-2">
            <Mail className="h-4 w-4" />
            Enviar por E-mail
          </Button>
          <Button size="sm" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Baixar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
