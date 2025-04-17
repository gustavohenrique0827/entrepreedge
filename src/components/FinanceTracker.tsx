
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StatCard from './StatCard';
import AddTransactionDialog from './finances/AddTransactionDialog';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
}

interface Report {
  id: string;
  title: string;
  description: string;
  dateGenerated: string;
  type: 'expenses' | 'income' | 'profitability' | 'projection';
  data: any;
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
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(
    JSON.parse(localStorage.getItem('transactions') || JSON.stringify(sampleTransactions))
  );
  const [reports, setReports] = useState<Report[]>(
    JSON.parse(localStorage.getItem('reports') || '[]')
  );
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { hasAccess, currentPlan } = useSubscription();

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

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

  // Generate report function
  const generateReport = (type: 'expenses' | 'income' | 'profitability' | 'projection') => {
    setIsGeneratingReport(true);
    
    // Simulate report generation delay
    setTimeout(() => {
      const newReport: Report = {
        id: `report-${Date.now()}`,
        title: type === 'expenses' ? 'Relatório de despesas por categoria' :
               type === 'income' ? 'Relatório de receitas por categoria' :
               type === 'profitability' ? 'Relatório de rentabilidade mensal' : 
               'Projeção financeira',
        description: `Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}`,
        dateGenerated: new Date().toISOString(),
        type: type,
        data: type === 'expenses' ? 
          generateExpensesByCategoryData() : 
          type === 'income' ? 
            generateIncomeData() :
            type === 'profitability' ?
              generateProfitabilityData() :
              generateProjectionData()
      };
      
      setReports(prev => [newReport, ...prev]);
      setActiveReport(newReport);
      setIsGeneratingReport(false);
      
      toast({
        title: "Relatório gerado",
        description: `${newReport.title} foi gerado com sucesso.`,
      });
    }, 1500);
  };

  // Sample data generators for reports
  const generateExpensesByCategoryData = () => {
    const categories = [...new Set(transactions.filter(t => t.type === 'expense').map(t => t.category))];
    return categories.map(category => ({
      category,
      amount: transactions.filter(t => t.type === 'expense' && t.category === category)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    }));
  };

  const generateIncomeData = () => {
    const categories = [...new Set(transactions.filter(t => t.type === 'income').map(t => t.category))];
    return categories.map(category => ({
      category,
      amount: transactions.filter(t => t.type === 'income' && t.category === category)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    }));
  };

  const generateProfitabilityData = () => {
    // Group by month
    const months = [...new Set(transactions.map(t => t.date.substring(0, 7)))].sort();
    return months.map(month => {
      const monthIncome = transactions
        .filter(t => t.type === 'income' && t.date.startsWith(month))
        .reduce((sum, t) => sum + t.amount, 0);
      
      const monthExpenses = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(month))
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        month: month,
        income: monthIncome,
        expenses: monthExpenses,
        profit: monthIncome - monthExpenses,
        profitMargin: monthIncome > 0 ? ((monthIncome - monthExpenses) / monthIncome) * 100 : 0
      };
    });
  };

  const generateProjectionData = () => {
    // Simple projection based on last 3 months average
    const lastMonths = [...new Set(transactions.map(t => t.date.substring(0, 7)))]
      .sort()
      .slice(-3);
    
    const averageIncome = lastMonths.length > 0 ? 
      lastMonths.reduce((sum, month) => 
        sum + transactions
          .filter(t => t.type === 'income' && t.date.startsWith(month))
          .reduce((sum, t) => sum + t.amount, 0), 
        0) / lastMonths.length 
      : 0;
    
    const averageExpenses = lastMonths.length > 0 ?
      lastMonths.reduce((sum, month) => 
        sum + transactions
          .filter(t => t.type === 'expense' && t.date.startsWith(month))
          .reduce((sum, t) => sum + t.amount, 0),
        0) / lastMonths.length
      : 0;
    
    // Project next 3 months
    const currentDate = new Date();
    const projections = [];
    
    for (let i = 1; i <= 3; i++) {
      const projectionDate = new Date(currentDate);
      projectionDate.setMonth(currentDate.getMonth() + i);
      
      projections.push({
        month: projectionDate.toISOString().substring(0, 7),
        projectedIncome: averageIncome * (1 + (Math.random() * 0.1)),
        projectedExpenses: averageExpenses * (1 + (Math.random() * 0.05)),
      });
    }
    
    return projections;
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
          
          <AddTransactionDialog onAddTransaction={handleAddTransaction} />
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
              {hasAccess('sales') ? (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm border border-dashed rounded-md">
                  Gráfico de fluxo de caixa será exibido aqui
                </div>
              ) : (
                <div className="h-[200px] flex flex-col items-center justify-center gap-2 text-muted-foreground border border-dashed rounded-md p-4">
                  <p>Acesso ao gráfico de fluxo de caixa disponível no Plano Iniciante ou superior.</p>
                  <Button size="sm" variant="outline" onClick={() => {
                    localStorage.setItem('settingsTab', 'subscription');
                    window.location.href = '/settings';
                  }}>
                    Atualizar plano
                  </Button>
                </div>
              )}
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
              {transactions.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">Nenhuma transação encontrada. Clique em "Nova transação" para começar.</p>
                </div>
              ) : (
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
              )}
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
              {activeReport ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{activeReport.title}</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setActiveReport(null)}
                    >
                      Voltar para lista
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{activeReport.description}</p>
                  
                  <div className="border rounded-md p-4 mt-4">
                    {activeReport.type === 'expenses' && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Despesas por categoria</h4>
                        {activeReport.data.map((item: any) => (
                          <div key={item.category} className="flex justify-between border-b pb-2">
                            <span className="text-sm">{item.category}</span>
                            <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {activeReport.type === 'income' && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Receitas por categoria</h4>
                        {activeReport.data.map((item: any) => (
                          <div key={item.category} className="flex justify-between border-b pb-2">
                            <span className="text-sm">{item.category}</span>
                            <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {activeReport.type === 'profitability' && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Rentabilidade mensal</h4>
                        {activeReport.data.map((item: any) => (
                          <div key={item.month} className="border-b pb-3 pt-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                {new Date(item.month + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                              </span>
                              <span className={`text-sm font-medium ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(item.profit)}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-muted-foreground">Receitas: {formatCurrency(item.income)}</span>
                              <span className="text-xs text-muted-foreground">Despesas: {formatCurrency(item.expenses)}</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-xs text-muted-foreground">
                                Margem de lucro: {item.profitMargin.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {activeReport.type === 'projection' && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Projeção Financeira</h4>
                        {activeReport.data.map((item: any) => (
                          <div key={item.month} className="border-b pb-3 pt-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                {new Date(item.month + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                              </span>
                              <span className="text-sm font-medium text-primary">
                                {formatCurrency(item.projectedIncome - item.projectedExpenses)}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-muted-foreground">Receitas: {formatCurrency(item.projectedIncome)}</span>
                              <span className="text-xs text-muted-foreground">Despesas: {formatCurrency(item.projectedExpenses)}</span>
                            </div>
                          </div>
                        ))}
                        <p className="text-xs text-muted-foreground italic">
                          *Projeção baseada no histórico dos últimos 3 meses
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                hasAccess('customReports') ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <p className="text-sm text-muted-foreground mb-1">Relatório de despesas por categoria</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2" 
                          onClick={() => generateReport('expenses')}
                          disabled={isGeneratingReport}
                        >
                          {isGeneratingReport ? 'Gerando...' : 'Gerar relatório'}
                        </Button>
                      </div>
                      <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <p className="text-sm text-muted-foreground mb-1">Relatório de rentabilidade mensal</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => generateReport('profitability')}
                          disabled={isGeneratingReport}
                        >
                          {isGeneratingReport ? 'Gerando...' : 'Gerar relatório'}
                        </Button>
                      </div>
                      {currentPlan === 'premium' && (
                        <>
                          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                            <p className="text-sm text-muted-foreground mb-1">Análise preditiva de tendências</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="mt-2"
                              onClick={() => generateReport('projection')}
                              disabled={isGeneratingReport}
                            >
                              {isGeneratingReport ? 'Gerando...' : 'Executar análise'}
                            </Button>
                          </div>
                          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                            <p className="text-sm text-muted-foreground mb-1">Relatório de projeção financeira</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="mt-2"
                              onClick={() => generateReport('projection')}
                              disabled={isGeneratingReport}
                            >
                              {isGeneratingReport ? 'Gerando...' : 'Gerar projeção'}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {reports.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-sm font-medium mb-3">Relatórios anteriores</h3>
                        <div className="space-y-2">
                          {reports.map((report) => (
                            <div 
                              key={report.id} 
                              className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:bg-muted/50"
                              onClick={() => setActiveReport(report)}
                            >
                              <div>
                                <h4 className="text-sm font-medium">{report.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  Gerado em {new Date(report.dateGenerated).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">Ver</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">Relatórios personalizados estão disponíveis no Plano Empresarial ou Premium.</p>
                    <Button variant="outline" onClick={() => {
                      localStorage.setItem('settingsTab', 'subscription');
                      window.location.href = '/settings';
                    }}>
                      Atualizar plano
                    </Button>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceTracker;
