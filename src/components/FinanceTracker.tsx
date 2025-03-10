
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StatCard from './StatCard';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
}

// Sample data
const sampleTransactions: Transaction[] = [
  { id: '1', description: 'Venda de produtos', amount: 1500, date: '2023-07-02', type: 'income', category: 'Vendas' },
  { id: '2', description: 'Aluguel', amount: 800, date: '2023-07-01', type: 'expense', category: 'Despesas fixas' },
  { id: '3', description: 'Materiais', amount: 350, date: '2023-07-05', type: 'expense', category: 'Insumos' },
  { id: '4', description: 'Serviço de consultoria', amount: 1200, date: '2023-07-10', type: 'income', category: 'Serviços' },
  { id: '5', description: 'Pagamento de energia', amount: 120, date: '2023-07-12', type: 'expense', category: 'Utilidades' },
];

const FinanceTracker: React.FC = () => {
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="animate-slide-up">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="glass">
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nova transação
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Receitas" 
              value={totalIncome} 
              change={0.12} 
              format={formatCurrency}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L20 11L17.6 13.4L13 8.8V21H11V8.8L6.4 13.4L4 11L12 3Z" fill="currentColor" />
                </svg>
              } 
            />
            <StatCard 
              title="Despesas" 
              value={totalExpenses} 
              change={-0.05} 
              format={formatCurrency}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21L4 13L6.4 10.6L11 15.2V3H13V15.2L17.6 10.6L20 13L12 21Z" fill="currentColor" />
                </svg>
              } 
            />
            <StatCard 
              title="Saldo" 
              value={balance} 
              format={formatCurrency}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="currentColor" />
                </svg>
              } 
            />
          </div>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle>Fluxo de caixa</CardTitle>
              <CardDescription>Visão geral das suas receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm border border-dashed rounded-md">
                Gráfico de fluxo de caixa será exibido aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Transações recentes</CardTitle>
              <CardDescription>Detalhes de suas receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'income' ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3L20 11L17.6 13.4L13 8.8V21H11V8.8L6.4 13.4L4 11L12 3Z" fill="#10B981" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21L4 13L6.4 10.6L11 15.2V3H13V15.2L17.6 10.6L20 13L12 21Z" fill="#EF4444" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Análise detalhada das suas finanças</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground mb-1">Relatório de despesas por categoria</p>
                    <Button size="sm" variant="outline" className="mt-2">Gerar relatório</Button>
                  </div>
                  <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground mb-1">Relatório de rentabilidade mensal</p>
                    <Button size="sm" variant="outline" className="mt-2">Gerar relatório</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceTracker;
