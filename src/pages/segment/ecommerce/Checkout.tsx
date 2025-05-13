
import React, { useState } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSegment } from '@/contexts/SegmentContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  CreditCard, 
  Check, 
  Truck, 
  PenTool, 
  Smartphone, 
  Image as ImageIcon,
  Save, 
  Palette, 
  Settings,
  FileCode,
  BellRing
} from 'lucide-react';

// Local storage key
const CHECKOUT_CONFIG_KEY = 'ecommerce_checkout_config';

const CheckoutPage = () => {
  const { segmentName } = useSegment();
  
  // Checkout configuration state
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem(CHECKOUT_CONFIG_KEY);
    
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    
    // Default configuration
    return {
      appearance: {
        theme: 'default',
        primaryColor: '#8B5CF6',
        buttonStyle: 'rounded',
        logo: '/logo-placeholder.png',
        backgroundImage: '',
      },
      checkout: {
        guestCheckout: true,
        requireAccountToCheckout: false,
        showOrderSummary: true,
        allowCouponCodes: true,
        requirePhone: true,
        showShippingEstimate: true,
      },
      fields: {
        requireAddress2: false,
        requireCompany: false,
        requireDocumentNumber: true,
        documentType: 'cpf_cnpj',
        collectBirthDate: false,
        collectNewsletter: true,
      },
      payment: {
        methods: ['credit_card', 'pix', 'bank_slip'],
        creditCardInstallments: true,
        maxInstallments: 12,
        pixDiscount: 5,
      },
      delivery: {
        methods: ['correios', 'local_pickup'],
        freeShippingAbove: 199,
        allowScheduledDelivery: false,
        showDeliveryTime: true,
      },
      advanced: {
        analyticsEnabled: true,
        abandonedCartRecovery: true,
        orderConfirmationEmail: true,
        customCheckoutDomain: '',
        orderHooks: '',
      }
    };
  });
  
  // Save configuration
  const saveConfiguration = () => {
    localStorage.setItem(CHECKOUT_CONFIG_KEY, JSON.stringify(config));
    
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de checkout foram salvas com sucesso.',
    });
  };
  
  // Update a specific configuration path
  const updateConfig = (path: string[], value: any) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      let current = newConfig;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      
      return newConfig;
    });
  };
  
  return (
    <SegmentPageLayout 
      title="Configuração de Checkout"
      description={`Personalize a experiência de checkout para o segmento de ${segmentName}`}
      action={
        <Button onClick={saveConfiguration}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      }
    >
      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="fields" className="flex items-center gap-1">
            <PenTool className="h-4 w-4" />
            <span className="hidden sm:inline">Campos</span>
          </TabsTrigger>
          <TabsTrigger value="checkout" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Checkout</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Pagamento</span>
          </TabsTrigger>
          <TabsTrigger value="delivery" className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Entrega</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Avançado</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" /> 
                Aparência do Checkout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Tema do Checkout</Label>
                    <Select 
                      value={config.appearance.theme} 
                      onValueChange={(value) => updateConfig(['appearance', 'theme'], value)}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Padrão</SelectItem>
                        <SelectItem value="minimal">Minimalista</SelectItem>
                        <SelectItem value="modern">Moderno</SelectItem>
                        <SelectItem value="classic">Clássico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={config.appearance.primaryColor}
                        onChange={(e) => updateConfig(['appearance', 'primaryColor'], e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        type="text"
                        value={config.appearance.primaryColor}
                        onChange={(e) => updateConfig(['appearance', 'primaryColor'], e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="buttonStyle">Estilo dos Botões</Label>
                    <Select 
                      value={config.appearance.buttonStyle} 
                      onValueChange={(value) => updateConfig(['appearance', 'buttonStyle'], value)}
                    >
                      <SelectTrigger id="buttonStyle">
                        <SelectValue placeholder="Selecione um estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">Arredondado</SelectItem>
                        <SelectItem value="squared">Quadrado</SelectItem>
                        <SelectItem value="pill">Formato de Pílula</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="block mb-2">Logo da Loja</Label>
                    <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-muted/20">
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Arraste uma imagem ou clique para fazer upload
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          Selecionar imagem
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Tamanho recomendado: 300 × 100px
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Imagem de Fundo (opcional)</Label>
                    <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-muted/20">
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Arraste uma imagem ou clique para fazer upload
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          Selecionar imagem
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={saveConfiguration}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Aparência
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Fields Settings */}
        <TabsContent value="fields">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="h-5 w-5 mr-2" /> 
                Campos do Formulário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireAddress2" className="block">Complemento de Endereço</Label>
                      <p className="text-sm text-muted-foreground">
                        Tornar complemento de endereço obrigatório
                      </p>
                    </div>
                    <Switch
                      id="requireAddress2"
                      checked={config.fields.requireAddress2}
                      onCheckedChange={(checked) => updateConfig(['fields', 'requireAddress2'], checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireCompany" className="block">Nome da Empresa</Label>
                      <p className="text-sm text-muted-foreground">
                        Tornar nome da empresa obrigatório
                      </p>
                    </div>
                    <Switch
                      id="requireCompany"
                      checked={config.fields.requireCompany}
                      onCheckedChange={(checked) => updateConfig(['fields', 'requireCompany'], checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireDocumentNumber" className="block">CPF/CNPJ</Label>
                      <p className="text-sm text-muted-foreground">
                        Tornar CPF/CNPJ obrigatório
                      </p>
                    </div>
                    <Switch
                      id="requireDocumentNumber"
                      checked={config.fields.requireDocumentNumber}
                      onCheckedChange={(checked) => updateConfig(['fields', 'requireDocumentNumber'], checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="documentType">Tipo de Documento</Label>
                    <Select 
                      value={config.fields.documentType} 
                      onValueChange={(value) => updateConfig(['fields', 'documentType'], value)}
                      disabled={!config.fields.requireDocumentNumber}
                    >
                      <SelectTrigger id="documentType">
                        <SelectValue placeholder="Selecione o tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpf_cnpj">CPF ou CNPJ</SelectItem>
                        <SelectItem value="cpf">Apenas CPF</SelectItem>
                        <SelectItem value="cnpj">Apenas CNPJ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="collectBirthDate" className="block">Data de Nascimento</Label>
                      <p className="text-sm text-muted-foreground">
                        Coletar data de nascimento do cliente
                      </p>
                    </div>
                    <Switch
                      id="collectBirthDate"
                      checked={config.fields.collectBirthDate}
                      onCheckedChange={(checked) => updateConfig(['fields', 'collectBirthDate'], checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="collectNewsletter" className="block">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Opção para assinar newsletter
                      </p>
                    </div>
                    <Switch
                      id="collectNewsletter"
                      checked={config.fields.collectNewsletter}
                      onCheckedChange={(checked) => updateConfig(['fields', 'collectNewsletter'], checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={saveConfiguration}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configuração de Campos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Checkout Settings */}
        <TabsContent value="checkout">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" /> 
                Processo de Checkout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="guestCheckout" className="block">Compra como Visitante</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir checkout sem criar conta
                    </p>
                  </div>
                  <Switch
                    id="guestCheckout"
                    checked={config.checkout.guestCheckout}
                    onCheckedChange={(checked) => {
                      updateConfig(['checkout', 'guestCheckout'], checked);
                      if (checked) {
                        updateConfig(['checkout', 'requireAccountToCheckout'], false);
                      }
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireAccountToCheckout" className="block">Obrigar Conta</Label>
                    <p className="text-sm text-muted-foreground">
                      Cliente precisa criar conta para finalizar
                    </p>
                  </div>
                  <Switch
                    id="requireAccountToCheckout"
                    checked={config.checkout.requireAccountToCheckout}
                    disabled={config.checkout.guestCheckout}
                    onCheckedChange={(checked) => {
                      updateConfig(['checkout', 'requireAccountToCheckout'], checked);
                      if (checked) {
                        updateConfig(['checkout', 'guestCheckout'], false);
                      }
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showOrderSummary" className="block">Resumo do Pedido</Label>
                    <p className="text-sm text-muted-foreground">
                      Mostrar resumo do pedido durante checkout
                    </p>
                  </div>
                  <Switch
                    id="showOrderSummary"
                    checked={config.checkout.showOrderSummary}
                    onCheckedChange={(checked) => updateConfig(['checkout', 'showOrderSummary'], checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowCouponCodes" className="block">Cupons de Desconto</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir uso de cupons de desconto
                    </p>
                  </div>
                  <Switch
                    id="allowCouponCodes"
                    checked={config.checkout.allowCouponCodes}
                    onCheckedChange={(checked) => updateConfig(['checkout', 'allowCouponCodes'], checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requirePhone" className="block">Telefone Obrigatório</Label>
                    <p className="text-sm text-muted-foreground">
                      Exigir número de telefone do cliente
                    </p>
                  </div>
                  <Switch
                    id="requirePhone"
                    checked={config.checkout.requirePhone}
                    onCheckedChange={(checked) => updateConfig(['checkout', 'requirePhone'], checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showShippingEstimate" className="block">Estimativa de Entrega</Label>
                    <p className="text-sm text-muted-foreground">
                      Mostrar estimativa de prazo de entrega
                    </p>
                  </div>
                  <Switch
                    id="showShippingEstimate"
                    checked={config.checkout.showShippingEstimate}
                    onCheckedChange={(checked) => updateConfig(['checkout', 'showShippingEstimate'], checked)}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={saveConfiguration}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configuração de Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" /> 
                Métodos de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="block mb-2">Meios de Pagamento Aceitos</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { id: 'credit_card', label: 'Cartão de Crédito' },
                    { id: 'debit_card', label: 'Cartão de Débito' },
                    { id: 'pix', label: 'PIX' },
                    { id: 'bank_slip', label: 'Boleto Bancário' },
                    { id: 'bank_transfer', label: 'Transferência Bancária' },
                    { id: 'wallet', label: 'Carteira Digital' },
                  ].map(method => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`payment-${method.id}`}
                        checked={config.payment.methods.includes(method.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateConfig(['payment', 'methods'], [...config.payment.methods, method.id]);
                          } else {
                            updateConfig(['payment', 'methods'], config.payment.methods.filter(m => m !== method.id));
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`payment-${method.id}`} className="text-sm">
                        {method.label}
                      </label>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="creditCardInstallments" className="block">Parcelamento</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir parcelamento em cartão de crédito
                    </p>
                  </div>
                  <Switch
                    id="creditCardInstallments"
                    checked={config.payment.creditCardInstallments}
                    onCheckedChange={(checked) => updateConfig(['payment', 'creditCardInstallments'], checked)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxInstallments">Número Máximo de Parcelas</Label>
                  <Select 
                    value={config.payment.maxInstallments.toString()} 
                    onValueChange={(value) => updateConfig(['payment', 'maxInstallments'], parseInt(value))}
                    disabled={!config.payment.creditCardInstallments}
                  >
                    <SelectTrigger id="maxInstallments">
                      <SelectValue placeholder="Selecione o máximo de parcelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}x {num === 1 ? '(à vista)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="pixDiscount">Desconto para PIX (%)</Label>
                  <div className="flex items-center">
                    <Input 
                      id="pixDiscount" 
                      type="number"
                      min="0"
                      max="100"
                      value={config.payment.pixDiscount}
                      onChange={(e) => updateConfig(['payment', 'pixDiscount'], Number(e.target.value))}
                      className="w-24"
                      disabled={!config.payment.methods.includes('pix')}
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={saveConfiguration}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configuração de Pagamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Delivery Settings */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" /> 
                Opções de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="block mb-2">Métodos de Entrega</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'correios', label: 'Correios' },
                    { id: 'local_pickup', label: 'Retirada na Loja' },
                    { id: 'own_delivery', label: 'Entrega Própria' },
                    { id: 'third_party', label: 'Transportadora' },
                  ].map(method => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`delivery-${method.id}`}
                        checked={config.delivery.methods.includes(method.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateConfig(['delivery', 'methods'], [...config.delivery.methods, method.id]);
                          } else {
                            updateConfig(['delivery', 'methods'], config.delivery.methods.filter(m => m !== method.id));
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`delivery-${method.id}`} className="text-sm">
                        {method.label}
                      </label>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="freeShippingAbove">Valor Mínimo para Frete Grátis</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground">
                      R$
                    </span>
                    <Input 
                      id="freeShippingAbove" 
                      type="number"
                      min="0"
                      step="0.01"
                      value={config.delivery.freeShippingAbove}
                      onChange={(e) => updateConfig(['delivery', 'freeShippingAbove'], Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Defina 0 para desativar frete grátis
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowScheduledDelivery" className="block">Entrega Agendada</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que cliente escolha dia/horário
                    </p>
                  </div>
                  <Switch
                    id="allowScheduledDelivery"
                    checked={config.delivery.allowScheduledDelivery}
                    onCheckedChange={(checked) => updateConfig(['delivery', 'allowScheduledDelivery'], checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showDeliveryTime" className="block">Prazo de Entrega</Label>
                    <p className="text-sm text-muted-foreground">
                      Mostrar prazo estimado de entrega
                    </p>
                  </div>
                  <Switch
                    id="showDeliveryTime"
                    checked={config.delivery.showDeliveryTime}
                    onCheckedChange={(checked) => updateConfig(['delivery', 'showDeliveryTime'], checked)}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={saveConfiguration}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configuração de Entrega
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" /> 
                Configurações Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analyticsEnabled" className="block">
                      <div className="flex items-center">
                        <FileCode className="h-4 w-4 mr-1" />
                        Analytics
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Rastreamento de comportamento no checkout
                    </p>
                  </div>
                  <Switch
                    id="analyticsEnabled"
                    checked={config.advanced.analyticsEnabled}
                    onCheckedChange={(checked) => updateConfig(['advanced', 'analyticsEnabled'], checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="abandonedCartRecovery" className="block">
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Carrinho Abandonado
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recuperação automática de carrinhos abandonados
                    </p>
                  </div>
                  <Switch
                    id="abandonedCartRecovery"
                    checked={config.advanced.abandonedCartRecovery}
                    onCheckedChange={(checked) => updateConfig(['advanced', 'abandonedCartRecovery'], checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderConfirmationEmail" className="block">
                      <div className="flex items-center">
                        <BellRing className="h-4 w-4 mr-1" />
                        E-mail de Confirmação
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar e-mail automático após compra
                    </p>
                  </div>
                  <Switch
                    id="orderConfirmationEmail"
                    checked={config.advanced.orderConfirmationEmail}
                    onCheckedChange={(checked) => updateConfig(['advanced', 'orderConfirmationEmail'], checked)}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="customCheckoutDomain">Domínio Personalizado</Label>
                  <div className="flex items-center">
                    <span className="mr-2">https://</span>
                    <Input 
                      id="customCheckoutDomain" 
                      placeholder="checkout.seusite.com.br"
                      value={config.advanced.customCheckoutDomain}
                      onChange={(e) => updateConfig(['advanced', 'customCheckoutDomain'], e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure seu DNS para apontar para nossa plataforma
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="orderHooks">WebHooks para Pedidos</Label>
                  <Textarea 
                    id="orderHooks" 
                    placeholder="https://sua-api.com/webhooks/orders"
                    value={config.advanced.orderHooks}
                    onChange={(e) => updateConfig(['advanced', 'orderHooks'], e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL para enviar notificações de pedidos (uma por linha)
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={saveConfiguration}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações Avançadas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SegmentPageLayout>
  );
};

export default CheckoutPage;
