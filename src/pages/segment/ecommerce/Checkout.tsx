
import React, { useState, useEffect } from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormLayout } from '@/components/segment/FormLayout';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Edit, ShoppingCart, Truck, ChevronsRight, DollarSign, Check, Package } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function Checkout() {
  const { segmentName } = useSegment();
  const [activeTab, setActiveTab] = useState('appearance');

  // Estado para configurações de checkout
  const [checkoutSettings, setCheckoutSettings] = useState({
    // Aparência
    logoUrl: 'https://placehold.co/200x80',
    primaryColor: '#6554C0',
    showProgressBar: true,
    // Campos
    requirePhone: true,
    requireAddress: true,
    collectBirthdate: false,
    collectCompanyInfo: false,
    // Pagamentos
    acceptCreditCard: true,
    acceptDebitCard: true,
    acceptBankSlip: true,
    acceptPix: true,
    installmentsEnabled: true,
    maxInstallments: 12,
    // Entregas
    offerFreeShipping: true,
    freeShippingThreshold: 150,
    showDeliveryEstimate: true,
    allowPickup: true,
    // Finalizações
    redirectAfterPurchase: true,
    redirectUrl: '/obrigado',
    sendOrderConfirmation: true,
    enableAbandonedCartRecovery: true,
  });

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setCheckoutSettings({
      ...checkoutSettings,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? Number(value) 
          : value
    });
  };

  const saveSettings = () => {
    // Simulação de salvamento
    toast({
      title: "Configurações salvas",
      description: "As configurações de checkout foram atualizadas com sucesso.",
    });
  };

  // Componente de visualização do checkout
  const CheckoutPreview = () => (
    <div className="border rounded-md p-4 bg-background">
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div>
          <img 
            src={checkoutSettings.logoUrl || 'https://placehold.co/200x80'} 
            alt="Logo da loja" 
            className="h-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <ShoppingCart className="inline-block h-4 w-4 mr-1" />
          Finalizar compra
        </div>
      </div>

      {checkoutSettings.showProgressBar && (
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span>Carrinho</span>
            <span>Pagamento</span>
            <span>Entrega</span>
            <span>Confirmação</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: '50%', 
                backgroundColor: checkoutSettings.primaryColor 
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Nome completo</label>
                <Input placeholder="Seu nome completo" className="h-9" disabled />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">E-mail</label>
                <Input placeholder="seu@email.com" className="h-9" disabled />
              </div>
              {checkoutSettings.requirePhone && (
                <div>
                  <label className="text-xs font-medium mb-1 block">Telefone</label>
                  <Input placeholder="(00) 00000-0000" className="h-9" disabled />
                </div>
              )}
              {checkoutSettings.collectBirthdate && (
                <div>
                  <label className="text-xs font-medium mb-1 block">Data de nascimento</label>
                  <Input type="date" className="h-9" disabled />
                </div>
              )}
            </CardContent>
          </Card>

          {checkoutSettings.requireAddress && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">CEP</label>
                    <Input placeholder="00000-000" className="h-9" disabled />
                  </div>
                  <div></div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Endereço</label>
                  <Input placeholder="Rua, avenida, etc." className="h-9" disabled />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Número</label>
                    <Input placeholder="123" className="h-9" disabled />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Complemento</label>
                    <Input placeholder="Apto, bloco, etc." className="h-9" disabled />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Cidade</label>
                    <Input placeholder="Sua cidade" className="h-9" disabled />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Estado</label>
                    <Input placeholder="UF" className="h-9" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Produto exemplo</span>
                  <span>R$ 99,90</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Outro produto</span>
                  <span>R$ 59,90</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Subtotal</span>
                    <span>R$ 159,80</span>
                  </div>
                  {checkoutSettings.offerFreeShipping && (
                    <div className="flex justify-between items-center text-sm">
                      <span>Frete</span>
                      <span className="text-green-600">Grátis</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-medium mt-2">
                    <span>Total</span>
                    <span>R$ 159,80</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" style={{ backgroundColor: checkoutSettings.primaryColor }}>
                Pagar agora
                <ChevronsRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <SegmentPageLayout 
      title="Configuração de Checkout" 
      description={`Personalize a experiência de compra para sua loja de ${segmentName}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="fields">Campos</TabsTrigger>
              <TabsTrigger value="payments">Pagamentos</TabsTrigger>
              <TabsTrigger value="delivery">Entrega</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance">
              <FormLayout
                title="Aparência do Checkout"
                description="Personalize a aparência do seu checkout para melhorar a conversão."
                onSubmit={(e) => { e.preventDefault(); saveSettings(); }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Logo da Loja</label>
                    <Input
                      name="logoUrl"
                      value={checkoutSettings.logoUrl}
                      onChange={handleSettingChange}
                      placeholder="https://seusite.com/logo.png"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL da imagem do logo que será exibido no topo do checkout
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Cor Primária</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        name="primaryColor"
                        value={checkoutSettings.primaryColor}
                        onChange={handleSettingChange}
                        className="w-10 h-10 rounded-md"
                      />
                      <Input
                        name="primaryColor"
                        value={checkoutSettings.primaryColor}
                        onChange={handleSettingChange}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cor principal para botões e elementos de destaque
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="showProgressBar"
                      name="showProgressBar"
                      checked={checkoutSettings.showProgressBar}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="showProgressBar" className="text-sm font-medium block">
                        Exibir Barra de Progresso
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Mostra aos clientes em que etapa do checkout eles estão
                      </p>
                    </div>
                  </div>
                </div>
              </FormLayout>
            </TabsContent>
            
            <TabsContent value="fields">
              <FormLayout
                title="Campos do Formulário"
                description="Configure quais informações serão solicitadas durante o checkout."
                onSubmit={(e) => { e.preventDefault(); saveSettings(); }}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="requirePhone"
                      name="requirePhone"
                      checked={checkoutSettings.requirePhone}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="requirePhone" className="text-sm font-medium block">
                        Exigir Telefone
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Solicitar número de telefone do cliente
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="requireAddress"
                      name="requireAddress"
                      checked={checkoutSettings.requireAddress}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="requireAddress" className="text-sm font-medium block">
                        Exigir Endereço
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Solicitar endereço completo para entrega
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="collectBirthdate"
                      name="collectBirthdate"
                      checked={checkoutSettings.collectBirthdate}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="collectBirthdate" className="text-sm font-medium block">
                        Coletar Data de Nascimento
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Solicitar data de nascimento do cliente
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="collectCompanyInfo"
                      name="collectCompanyInfo"
                      checked={checkoutSettings.collectCompanyInfo}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="collectCompanyInfo" className="text-sm font-medium block">
                        Coletar Informações de Empresa
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Incluir campos para razão social, CNPJ e informações fiscais
                      </p>
                    </div>
                  </div>
                </div>
              </FormLayout>
            </TabsContent>
            
            <TabsContent value="payments">
              <FormLayout
                title="Opções de Pagamento"
                description="Configure os métodos de pagamento disponíveis no checkout."
                onSubmit={(e) => { e.preventDefault(); saveSettings(); }}
              >
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Métodos de Pagamento</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="acceptCreditCard"
                        name="acceptCreditCard"
                        checked={checkoutSettings.acceptCreditCard}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="acceptCreditCard" className="text-sm font-medium block">
                          Cartão de Crédito
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Aceitar pagamentos com cartão de crédito
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="acceptDebitCard"
                        name="acceptDebitCard"
                        checked={checkoutSettings.acceptDebitCard}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="acceptDebitCard" className="text-sm font-medium block">
                          Cartão de Débito
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Aceitar pagamentos com cartão de débito
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="acceptBankSlip"
                        name="acceptBankSlip"
                        checked={checkoutSettings.acceptBankSlip}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="acceptBankSlip" className="text-sm font-medium block">
                          Boleto Bancário
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Aceitar pagamentos via boleto bancário
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="acceptPix"
                        name="acceptPix"
                        checked={checkoutSettings.acceptPix}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="acceptPix" className="text-sm font-medium block">
                          PIX
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Aceitar pagamentos via PIX
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t space-y-3">
                    <h3 className="text-sm font-medium">Parcelamento</h3>
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="installmentsEnabled"
                        name="installmentsEnabled"
                        checked={checkoutSettings.installmentsEnabled}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="installmentsEnabled" className="text-sm font-medium block">
                          Habilitar Parcelamento
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Permitir que o cliente parcele suas compras no cartão de crédito
                        </p>
                      </div>
                    </div>
                    
                    {checkoutSettings.installmentsEnabled && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Número Máximo de Parcelas
                        </label>
                        <select 
                          name="maxInstallments"
                          value={checkoutSettings.maxInstallments}
                          onChange={handleSettingChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value={1}>1x (à vista)</option>
                          <option value={2}>2x</option>
                          <option value={3}>3x</option>
                          <option value={6}>6x</option>
                          <option value={12}>12x</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </FormLayout>
            </TabsContent>
            
            <TabsContent value="delivery">
              <FormLayout
                title="Configurações de Entrega"
                description="Personalize as opções de envio e entrega disponíveis para seus clientes."
                onSubmit={(e) => { e.preventDefault(); saveSettings(); }}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="offerFreeShipping"
                      name="offerFreeShipping"
                      checked={checkoutSettings.offerFreeShipping}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="offerFreeShipping" className="text-sm font-medium block">
                        Oferecer Frete Grátis
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Disponibilizar opção de frete grátis para seus clientes
                      </p>
                    </div>
                  </div>
                  
                  {checkoutSettings.offerFreeShipping && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Valor Mínimo para Frete Grátis
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          name="freeShippingThreshold"
                          type="number"
                          min="0"
                          value={checkoutSettings.freeShippingThreshold}
                          onChange={handleSettingChange}
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Valor mínimo de compra para que o cliente tenha direito a frete grátis
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="showDeliveryEstimate"
                      name="showDeliveryEstimate"
                      checked={checkoutSettings.showDeliveryEstimate}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="showDeliveryEstimate" className="text-sm font-medium block">
                        Mostrar Estimativa de Entrega
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Exibir prazo estimado de entrega para cada opção de frete
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="allowPickup"
                      name="allowPickup"
                      checked={checkoutSettings.allowPickup}
                      onChange={handleSettingChange}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="allowPickup" className="text-sm font-medium block">
                        Permitir Retirada na Loja
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Oferecer opção para o cliente retirar o produto pessoalmente
                      </p>
                    </div>
                  </div>
                </div>
              </FormLayout>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span>Configurações Avançadas</span>
                  <ChevronsRight className="h-4 w-4 transition-transform transform rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <FormLayout
                  title="Configurações de Finalização"
                  description="Configure o comportamento após a conclusão do pedido."
                  onSubmit={(e) => { e.preventDefault(); saveSettings(); }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="redirectAfterPurchase"
                        name="redirectAfterPurchase"
                        checked={checkoutSettings.redirectAfterPurchase}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="redirectAfterPurchase" className="text-sm font-medium block">
                          Redirecionar Após Compra
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Redirecionar o cliente para uma página específica após finalizar a compra
                        </p>
                      </div>
                    </div>
                    
                    {checkoutSettings.redirectAfterPurchase && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">URL de Redirecionamento</label>
                        <Input
                          name="redirectUrl"
                          value={checkoutSettings.redirectUrl}
                          onChange={handleSettingChange}
                          placeholder="/obrigado"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="sendOrderConfirmation"
                        name="sendOrderConfirmation"
                        checked={checkoutSettings.sendOrderConfirmation}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="sendOrderConfirmation" className="text-sm font-medium block">
                          Enviar Confirmação de Pedido
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Enviar e-mail de confirmação após a conclusão do pedido
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="enableAbandonedCartRecovery"
                        name="enableAbandonedCartRecovery"
                        checked={checkoutSettings.enableAbandonedCartRecovery}
                        onChange={handleSettingChange}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="enableAbandonedCartRecovery" className="text-sm font-medium block">
                          Recuperação de Carrinho Abandonado
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Enviar e-mail para clientes que abandonaram o carrinho de compras
                        </p>
                      </div>
                    </div>
                  </div>
                </FormLayout>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
        
        <div>
          <div className="sticky top-4">
            <h3 className="text-lg font-medium mb-4">Pré-visualização</h3>
            <CheckoutPreview />
          </div>
        </div>
      </div>
    </SegmentPageLayout>
  );
}
