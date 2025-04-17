
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Shield, 
  ShieldCheck, 
  ShieldQuestion, 
  ShieldX, 
  UserCog,
  Lock,
  LockKeyhole
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface AccessLevel {
  id: number;
  name: string;
  description: string;
  level: 'user' | 'manager' | 'admin' | 'support' | 'developer';
  status: 'active' | 'inactive';
  permissions: Permission[];
}

interface Permission {
  id: number;
  moduleId: string;
  moduleName: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  level: 'user' | 'manager' | 'admin' | 'support' | 'developer';
  status: 'active' | 'inactive';
}

const AccessLevels = () => {
  const { toast } = useToast();
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isEditPermissionsOpen, setIsEditPermissionsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('levels');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<AccessLevel | null>(null);
  
  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>([
    {
      id: 1,
      name: 'Usuário',
      description: 'Acesso básico ao sistema',
      level: 'user',
      status: 'active',
      permissions: [
        { id: 1, moduleId: 'calendar', moduleName: 'Agenda', create: true, read: true, update: true, delete: false },
        { id: 2, moduleId: 'reports', moduleName: 'Relatórios', create: false, read: true, update: false, delete: false },
      ]
    },
    {
      id: 2,
      name: 'Gerente',
      description: 'Acesso intermediário com aprovações',
      level: 'manager',
      status: 'active',
      permissions: [
        { id: 3, moduleId: 'calendar', moduleName: 'Agenda', create: true, read: true, update: true, delete: true },
        { id: 4, moduleId: 'reports', moduleName: 'Relatórios', create: true, read: true, update: true, delete: false },
        { id: 5, moduleId: 'personnel', moduleName: 'Pessoal', create: true, read: true, update: true, delete: false },
      ]
    },
    {
      id: 3,
      name: 'Administrador',
      description: 'Acesso completo ao sistema',
      level: 'admin',
      status: 'active',
      permissions: [
        { id: 6, moduleId: 'calendar', moduleName: 'Agenda', create: true, read: true, update: true, delete: true },
        { id: 7, moduleId: 'reports', moduleName: 'Relatórios', create: true, read: true, update: true, delete: true },
        { id: 8, moduleId: 'personnel', moduleName: 'Pessoal', create: true, read: true, update: true, delete: true },
        { id: 9, moduleId: 'accounting', moduleName: 'Contabilidade', create: true, read: true, update: true, delete: true },
      ]
    },
    {
      id: 4,
      name: 'Suporte',
      description: 'Acesso para ajudar usuários finais',
      level: 'support',
      status: 'active',
      permissions: [
        { id: 10, moduleId: 'calendar', moduleName: 'Agenda', create: false, read: true, update: false, delete: false },
        { id: 11, moduleId: 'reports', moduleName: 'Relatórios', create: false, read: true, update: false, delete: false },
        { id: 12, moduleId: 'personnel', moduleName: 'Pessoal', create: false, read: true, update: false, delete: false },
        { id: 13, moduleId: 'accounting', moduleName: 'Contabilidade', create: false, read: true, update: false, delete: false },
      ]
    },
    {
      id: 5,
      name: 'Desenvolvedor',
      description: 'Acesso total para desenvolvedores do sistema',
      level: 'developer',
      status: 'active',
      permissions: [
        { id: 14, moduleId: 'calendar', moduleName: 'Agenda', create: true, read: true, update: true, delete: true },
        { id: 15, moduleId: 'reports', moduleName: 'Relatórios', create: true, read: true, update: true, delete: true },
        { id: 16, moduleId: 'personnel', moduleName: 'Pessoal', create: true, read: true, update: true, delete: true },
        { id: 17, moduleId: 'accounting', moduleName: 'Contabilidade', create: true, read: true, update: true, delete: true },
        { id: 18, moduleId: 'devtools', moduleName: 'Ferramentas Dev', create: true, read: true, update: true, delete: true },
      ]
    }
  ]);
  
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'João Silva', email: 'joao@empresa.com', level: 'user', status: 'active' },
    { id: 2, name: 'Maria Santos', email: 'maria@empresa.com', level: 'manager', status: 'active' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@empresa.com', level: 'admin', status: 'active' },
    { id: 4, name: 'Ana Costa', email: 'ana@empresa.com', level: 'support', status: 'active' },
    { id: 5, name: 'Carlos Ferreira', email: 'carlos@empresa.com', level: 'developer', status: 'active' },
  ]);
  
  const [newLevel, setNewLevel] = useState<Omit<AccessLevel, 'id' | 'permissions'>>({
    name: '',
    description: '',
    level: 'user',
    status: 'active'
  });
  
  const handleAddLevel = () => {
    if (!newLevel.name) {
      toast({
        title: "Erro ao criar nível",
        description: "Nome do nível é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    const level: AccessLevel = {
      ...newLevel,
      id: accessLevels.length + 1,
      permissions: []
    };
    
    setAccessLevels([...accessLevels, level]);
    setIsAddLevelOpen(false);
    setNewLevel({
      name: '',
      description: '',
      level: 'user',
      status: 'active'
    });
    
    toast({
      title: "Nível adicionado",
      description: "O nível de acesso foi adicionado com sucesso.",
    });
  };
  
  const handleDeleteLevel = (id: number) => {
    setAccessLevels(accessLevels.filter(level => level.id !== id));
    
    toast({
      title: "Nível removido",
      description: "O nível de acesso foi removido com sucesso.",
    });
  };
  
  const handleEditPermissions = (level: AccessLevel) => {
    setSelectedLevel(level);
    setIsEditPermissionsOpen(true);
  };
  
  const handleTogglePermission = (permissionId: number, field: 'create' | 'read' | 'update' | 'delete') => {
    if (!selectedLevel) return;
    
    const updatedPermissions = selectedLevel.permissions.map(permission => 
      permission.id === permissionId 
        ? { ...permission, [field]: !permission[field] } 
        : permission
    );
    
    setSelectedLevel({
      ...selectedLevel,
      permissions: updatedPermissions
    });
  };
  
  const handleSavePermissions = () => {
    if (!selectedLevel) return;
    
    setAccessLevels(accessLevels.map(level => 
      level.id === selectedLevel.id ? selectedLevel : level
    ));
    
    setIsEditPermissionsOpen(false);
    
    toast({
      title: "Permissões atualizadas",
      description: "As permissões foram atualizadas com sucesso.",
    });
  };
  
  const handleChangeUserLevel = (userId: number, newLevel: 'user' | 'manager' | 'admin' | 'support' | 'developer') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, level: newLevel } : user
    ));
    
    toast({
      title: "Nível alterado",
      description: "O nível de acesso do usuário foi alterado com sucesso.",
    });
  };
  
  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Usuário ${newStatus === 'active' ? 'ativado' : 'desativado'}`,
      description: `O usuário foi ${newStatus === 'active' ? 'ativado' : 'desativado'} com sucesso.`,
    });
  };
  
  const getLevelIcon = (level: 'user' | 'manager' | 'admin' | 'support' | 'developer') => {
    switch (level) {
      case 'user':
        return <Shield className="h-4 w-4" />;
      case 'manager':
        return <ShieldCheck className="h-4 w-4" />;
      case 'admin':
        return <ShieldCheck className="h-4 w-4 text-primary" />;
      case 'support':
        return <ShieldQuestion className="h-4 w-4" />;
      case 'developer':
        return <ShieldX className="h-4 w-4 text-primary" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };
  
  const getLevelName = (level: 'user' | 'manager' | 'admin' | 'support' | 'developer') => {
    switch (level) {
      case 'user': return 'Usuário';
      case 'manager': return 'Gerente';
      case 'admin': return 'Administrador';
      case 'support': return 'Suporte';
      case 'developer': return 'Desenvolvedor';
      default: return level;
    }
  };
  
  const filteredLevels = accessLevels.filter(level => 
    level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <PageContainer>
      <PageHeader 
        title="Níveis de Acesso" 
        description="Gerencie níveis de acesso e permissões de usuários no sistema" 
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs 
            defaultValue="levels" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="levels">Níveis de Acesso</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center ml-4 gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {activeTab === 'levels' && (
              <Button onClick={() => setIsAddLevelOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Nível
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="levels" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Níveis de Acesso</CardTitle>
              <CardDescription>
                Gerencie os níveis de acesso disponíveis no sistema e suas permissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Nível</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissões</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLevels.length > 0 ? (
                      filteredLevels.map((level) => (
                        <TableRow key={level.id}>
                          <TableCell className="font-medium">{level.name}</TableCell>
                          <TableCell>{level.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getLevelIcon(level.level)}
                              {getLevelName(level.level)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={level.status === 'active' ? 'default' : 'secondary'}
                            >
                              {level.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {level.permissions.length} permissões
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditPermissions(level)}
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteLevel(level.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Nenhum nível de acesso encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>
                Gerencie os níveis de acesso dos usuários no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Nível de Acesso</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select
                              value={user.level}
                              onValueChange={(value: 'user' | 'manager' | 'admin' | 'support' | 'developer') => 
                                handleChangeUserLevel(user.id, value)
                              }
                            >
                              <SelectTrigger className="w-[150px]">
                                <div className="flex items-center gap-2">
                                  {getLevelIcon(user.level)}
                                  <SelectValue placeholder="Selecione o nível" />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">
                                  <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Usuário
                                  </div>
                                </SelectItem>
                                <SelectItem value="manager">
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Gerente
                                  </div>
                                </SelectItem>
                                <SelectItem value="admin">
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    Administrador
                                  </div>
                                </SelectItem>
                                <SelectItem value="support">
                                  <div className="flex items-center gap-2">
                                    <ShieldQuestion className="h-4 w-4" />
                                    Suporte
                                  </div>
                                </SelectItem>
                                <SelectItem value="developer">
                                  <div className="flex items-center gap-2">
                                    <ShieldX className="h-4 w-4 text-primary" />
                                    Desenvolvedor
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === 'active' ? 'default' : 'secondary'}
                            >
                              {user.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.status === 'active' ? (
                                  <X className="h-4 w-4 text-red-500" />
                                ) : (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <UserCog className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          Nenhum usuário encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Add Level Dialog */}
        <Dialog open={isAddLevelOpen} onOpenChange={setIsAddLevelOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Nível de Acesso</DialogTitle>
              <DialogDescription>
                Defina os detalhes do novo nível de acesso no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome*</Label>
                <Input
                  id="name"
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                  placeholder="Ex: Gerente de Vendas"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  placeholder="Ex: Acesso para gerentes do setor de vendas"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="level">Nível Base</Label>
                <Select
                  value={newLevel.level}
                  onValueChange={(value: 'user' | 'manager' | 'admin' | 'support' | 'developer') => 
                    setNewLevel({ ...newLevel, level: value })
                  }
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Selecione o nível base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="support">Suporte</SelectItem>
                    <SelectItem value="developer">Desenvolvedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newLevel.status === 'active'}
                  onCheckedChange={(checked) => 
                    setNewLevel({ ...newLevel, status: checked ? 'active' : 'inactive' })
                  }
                />
                <Label htmlFor="status">Ativo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddLevelOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddLevel}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Nível
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Permissions Dialog */}
        <Dialog open={isEditPermissionsOpen} onOpenChange={setIsEditPermissionsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Editar Permissões - {selectedLevel?.name}</DialogTitle>
              <DialogDescription>
                Defina as permissões específicas para este nível de acesso.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {selectedLevel?.permissions.map((permission) => (
                    <div key={permission.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium">{permission.moduleName}</h3>
                        <Badge variant="outline">{permission.moduleId}</Badge>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`create-${permission.id}`}
                            checked={permission.create}
                            onCheckedChange={() => handleTogglePermission(permission.id, 'create')}
                          />
                          <Label htmlFor={`create-${permission.id}`}>Criar</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`read-${permission.id}`}
                            checked={permission.read}
                            onCheckedChange={() => handleTogglePermission(permission.id, 'read')}
                          />
                          <Label htmlFor={`read-${permission.id}`}>Visualizar</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`update-${permission.id}`}
                            checked={permission.update}
                            onCheckedChange={() => handleTogglePermission(permission.id, 'update')}
                          />
                          <Label htmlFor={`update-${permission.id}`}>Editar</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`delete-${permission.id}`}
                            checked={permission.delete}
                            onCheckedChange={() => handleTogglePermission(permission.id, 'delete')}
                          />
                          <Label htmlFor={`delete-${permission.id}`}>Excluir</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditPermissionsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSavePermissions}>
                <LockKeyhole className="mr-2 h-4 w-4" />
                Salvar Permissões
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default AccessLevels;
