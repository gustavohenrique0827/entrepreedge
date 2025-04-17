
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, BarChart2, Code, Settings, Plus, UserCheck, Lock, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for access levels
const initialAccessLevels = [
  { id: 1, name: 'Usuário', level: 'user', active: true, permissions: { read: true, create: false, update: false, delete: false, admin: false } },
  { id: 2, name: 'Gerente', level: 'manager', active: true, permissions: { read: true, create: true, update: true, delete: false, admin: false } },
  { id: 3, name: 'Administrador', level: 'admin', active: true, permissions: { read: true, create: true, update: true, delete: true, admin: true } },
  { id: 4, name: 'Suporte', level: 'support', active: true, permissions: { read: true, create: false, update: true, delete: false, admin: false } },
  { id: 5, name: 'Desenvolvedor', level: 'developer', active: true, permissions: { read: true, create: true, update: true, delete: true, admin: true } },
];

// Sample users data
const initialUsers = [
  { id: 1, name: 'João Silva', email: 'joao@empresa.com', level: 'user', active: true },
  { id: 2, name: 'Maria Santos', email: 'maria@empresa.com', level: 'manager', active: true },
  { id: 3, name: 'Pedro Alves', email: 'pedro@empresa.com', level: 'admin', active: true },
  { id: 4, name: 'Ana Souza', email: 'ana@suporte.com', level: 'support', active: true },
  { id: 5, name: 'Carlos Mendes', email: 'carlos@dev.com', level: 'developer', active: false },
];

const AccessLevels = () => {
  const [accessLevels, setAccessLevels] = useState(initialAccessLevels);
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('levels');
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const { toast } = useToast();

  const handleLevelSelect = (level: any) => {
    setSelectedLevel(level);
    setShowForm(true);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (!selectedLevel) return;
    
    setSelectedLevel({
      ...selectedLevel,
      permissions: {
        ...selectedLevel.permissions,
        [permission]: checked
      }
    });
  };

  const saveLevel = () => {
    if (!selectedLevel) return;
    
    if (selectedLevel.id) {
      // Update existing level
      setAccessLevels(accessLevels.map(level => 
        level.id === selectedLevel.id ? selectedLevel : level
      ));
    } else {
      // Add new level
      const newId = accessLevels.length > 0 ? Math.max(...accessLevels.map(l => l.id)) + 1 : 1;
      setAccessLevels([...accessLevels, { ...selectedLevel, id: newId }]);
    }
    
    setShowForm(false);
    setSelectedLevel(null);
    toast({
      title: "Sucesso",
      description: "Nível de acesso salvo com sucesso",
    });
  };

  const handleNewLevel = () => {
    setSelectedLevel({
      id: null,
      name: '',
      level: '',
      active: true,
      permissions: {
        read: true,
        create: false,
        update: false,
        delete: false,
        admin: false
      }
    });
    setShowForm(true);
  };

  const toggleLevelStatus = (id: number) => {
    setAccessLevels(accessLevels.map(level => 
      level.id === id 
        ? { ...level, active: !level.active } 
        : level
    ));
    toast({
      title: "Status atualizado",
      description: "O status do nível de acesso foi atualizado com sucesso",
    });
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, active: !user.active } 
        : user
    ));
    toast({
      title: "Status atualizado",
      description: "O status do usuário foi atualizado com sucesso",
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Dev/Admin',
      href: '/dev-admin/access-levels',
      icon: <Code size={18} />
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: <Settings size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <PageContainer>
          <PageHeader 
            title="Níveis de Acesso" 
            description="Gerencie níveis de acesso e permissões"
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="levels" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Níveis
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="levels">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Níveis de Acesso</CardTitle>
                    <CardDescription>
                      Gerencie os níveis de acesso e permissões do sistema
                    </CardDescription>
                  </div>
                  <Button onClick={handleNewLevel}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Nível
                  </Button>
                </CardHeader>
                <CardContent>
                  {showForm && selectedLevel && (
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>{selectedLevel.id ? 'Editar' : 'Novo'} Nível de Acesso</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Nome do Nível</Label>
                            <Input
                              id="name"
                              value={selectedLevel.name}
                              onChange={(e) => setSelectedLevel({...selectedLevel, name: e.target.value})}
                              placeholder="Ex: Gerente"
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="level">Identificador</Label>
                            <Input
                              id="level"
                              value={selectedLevel.level}
                              onChange={(e) => setSelectedLevel({...selectedLevel, level: e.target.value})}
                              placeholder="Ex: manager"
                            />
                          </div>
                          
                          <div className="mt-4">
                            <Label className="mb-2 block">Permissões</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="read" 
                                  checked={selectedLevel.permissions.read}
                                  onCheckedChange={(checked) => handlePermissionChange('read', !!checked)} 
                                />
                                <Label htmlFor="read" className="font-normal">Visualizar (Leitura)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="create" 
                                  checked={selectedLevel.permissions.create}
                                  onCheckedChange={(checked) => handlePermissionChange('create', !!checked)} 
                                />
                                <Label htmlFor="create" className="font-normal">Criar</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="update" 
                                  checked={selectedLevel.permissions.update}
                                  onCheckedChange={(checked) => handlePermissionChange('update', !!checked)} 
                                />
                                <Label htmlFor="update" className="font-normal">Atualizar</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="delete" 
                                  checked={selectedLevel.permissions.delete}
                                  onCheckedChange={(checked) => handlePermissionChange('delete', !!checked)} 
                                />
                                <Label htmlFor="delete" className="font-normal">Excluir</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="admin" 
                                  checked={selectedLevel.permissions.admin}
                                  onCheckedChange={(checked) => handlePermissionChange('admin', !!checked)} 
                                />
                                <Label htmlFor="admin" className="font-normal">Administrador</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => {
                              setShowForm(false);
                              setSelectedLevel(null);
                            }}>
                              Cancelar
                            </Button>
                            <Button type="button" onClick={saveLevel}>
                              Salvar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Identificador</TableHead>
                        <TableHead>Permissões</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accessLevels.map((level) => (
                        <TableRow key={level.id}>
                          <TableCell className="font-medium">{level.name}</TableCell>
                          <TableCell>{level.level}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {level.permissions.read && (
                                <Badge variant="outline" className="mr-1">Visualizar</Badge>
                              )}
                              {level.permissions.create && (
                                <Badge variant="outline" className="mr-1">Criar</Badge>
                              )}
                              {level.permissions.update && (
                                <Badge variant="outline" className="mr-1">Atualizar</Badge>
                              )}
                              {level.permissions.delete && (
                                <Badge variant="outline" className="mr-1">Excluir</Badge>
                              )}
                              {level.permissions.admin && (
                                <Badge variant="secondary" className="mr-1">Admin</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={level.active ? 'default' : 'outline'}>
                              {level.active ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" onClick={() => handleLevelSelect(level)} title="Editar">
                                <Lock className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant={level.active ? 'destructive' : 'outline'} 
                                size="icon" 
                                onClick={() => toggleLevelStatus(level.id)}
                                title={level.active ? 'Desativar' : 'Ativar'}
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Total de níveis: {accessLevels.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ativos: {accessLevels.filter(l => l.active).length} | 
                    Inativos: {accessLevels.filter(l => !l.active).length}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Usuários e Permissões</CardTitle>
                  <CardDescription>
                    Visualize e gerencie os usuários do sistema e suas permissões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Nível de Acesso</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {accessLevels.find(l => l.level === user.level)?.name || user.level}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.active ? 'default' : 'outline'}>
                              {user.active ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" title="Editar Permissões">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant={user.active ? 'destructive' : 'outline'} 
                                size="icon" 
                                onClick={() => toggleUserStatus(user.id)}
                                title={user.active ? 'Desativar' : 'Ativar'}
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Total de usuários: {users.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ativos: {users.filter(u => u.active).length} | 
                    Inativos: {users.filter(u => !u.active).length}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </PageContainer>
      </div>
    </div>
  );
};

export default AccessLevels;
