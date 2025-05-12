
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useSegment } from '@/contexts/SegmentContext'
import useSegmentConfig from '@/hooks/useSegmentConfig'
import { useToast } from '@/hooks/use-toast'
import { Check, LayoutDashboard, Palette, Settings, TagIcon } from 'lucide-react'

// Componente para detectar e configurar automaticamente o sistema pelo segmento selecionado
const AutoSegmentConfig = () => {
  const [open, setOpen] = useState(false)
  const { segmentName, currentSegment, applySegmentVisuals } = useSegment()
  const { applySegmentConfig, isConfigApplied } = useSegmentConfig()
  const { toast } = useToast()
  const [configuring, setConfiguring] = useState(false)
  const [configured, setConfigured] = useState(false)

  // Verificar se é a primeira vez que o usuário acessa o sistema
  useEffect(() => {
    const firstAccess = localStorage.getItem('firstAccess') !== 'false'
    const segmentConfigured = localStorage.getItem('segmentConfigApplied') === 'true'

    if (firstAccess && !segmentConfigured) {
      setTimeout(() => {
        setOpen(true)
      }, 1500)
    }
  }, [])

  // Aplicar configurações
  const applyConfiguration = () => {
    setConfiguring(true)

    // Aplicar configurações visuais
    applySegmentVisuals()
    
    // Simular processo de configuração
    setTimeout(() => {
      // Aplicar configurações de módulos e estrutura
      applySegmentConfig()
      
      // Marcar como configurado
      localStorage.setItem('firstAccess', 'false')
      setConfiguring(false)
      setConfigured(true)
      
      // Mostrar mensagem de sucesso
      toast({
        title: "Configuração concluída",
        description: `Seu sistema foi configurado para ${segmentName}`,
        variant: "success",
      })
      
      // Fechar o diálogo após um tempo
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    }, 2000)
  }

  // Fechar o diálogo e salvar preferência
  const handleClose = () => {
    localStorage.setItem('firstAccess', 'false')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            Configuração inicial do sistema
          </DialogTitle>
          <DialogDescription>
            Detectamos que seu segmento é <strong>{segmentName}</strong>. 
            Deseja aplicar automaticamente todas as configurações otimizadas para este segmento?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Personalização visual</h3>
                <p className="text-xs text-muted-foreground">
                  Cores, tipografia e estilo adaptados para {segmentName}
                </p>
              </div>
              {configuring && <span className="ml-auto animate-pulse text-xs text-primary">Configurando...</span>}
              {configured && <Check className="ml-auto h-4 w-4 text-green-500" />}
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Estrutura de módulos</h3>
                <p className="text-xs text-muted-foreground">
                  Módulos e páginas específicos para {segmentName}
                </p>
              </div>
              {configuring && <span className="ml-auto animate-pulse text-xs text-primary">Configurando...</span>}
              {configured && <Check className="ml-auto h-4 w-4 text-green-500" />}
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Configurações avançadas</h3>
                <p className="text-xs text-muted-foreground">
                  Permissões, papéis e fluxos padrão para {segmentName}
                </p>
              </div>
              {configuring && <span className="ml-auto animate-pulse text-xs text-primary">Configurando...</span>}
              {configured && <Check className="ml-auto h-4 w-4 text-green-500" />}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={configuring}
          >
            Configurar manualmente
          </Button>
          <Button 
            onClick={applyConfiguration}
            disabled={configuring || configured}
            className={configuring ? 'animate-pulse' : ''}
          >
            {configuring ? 'Configurando...' : configured ? 'Configurado' : 'Aplicar configuração'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AutoSegmentConfig
