import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Download, Edit, Eye, FileText, Plus, Printer, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';

const Payslips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Initiated",
      description: "Payslip download has started.",
    });
  };

  const payslipsData = [
    { id: 1, employee: 'John Doe', period: '2024-01', status: 'Paid' },
    { id: 2, employee: 'Jane Smith', period: '2024-01', status: 'Paid' },
    { id: 3, employee: 'Alice Johnson', period: '2024-01', status: 'Pending' },
  ];

  const filteredPayslips = payslipsData.filter(payslip =>
    payslip.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payslip.period.includes(searchTerm)
  );

  return (
    <PageContainer>
      <PageHeader title="Payslips" description="Manage and view employee payslips" />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            type="search"
            placeholder="Search employee or period..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate Payslip
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payslips Overview</CardTitle>
            <CardDescription>View and manage employee payslips.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayslips.map((payslip) => (
                  <TableRow key={payslip.id}>
                    <TableCell>{payslip.id}</TableCell>
                    <TableCell>{payslip.employee}</TableCell>
                    <TableCell>{payslip.period}</TableCell>
                    <TableCell>
                      <Badge variant={payslip.status === 'Paid' ? 'success' : 'secondary'}>
                        {payslip.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between">
            <div>Total Payslips: {filteredPayslips.length}</div>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print All
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Payslips;
