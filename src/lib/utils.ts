
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats currency values
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Format date to locale string (pt-BR)
export function formatDate(date: string | Date): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
}

// Calculate remaining days between two dates
export function getDaysRemaining(endDate: string | Date): number {
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const today = new Date();
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calculate percentage progress
export function calculateProgress(current: number, target: number): number {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

// Generate chart data from an array of objects
export function generateChartData(data: any[], valueKey: string, labelKey: string) {
  return data.map(item => ({
    name: item[labelKey],
    value: item[valueKey],
  }));
}

// Get status based on progress and deadline
export function getStatus(progress: number, daysRemaining: number): 'completed' | 'on-track' | 'at-risk' | 'overdue' {
  if (progress >= 100) return 'completed';
  if (daysRemaining < 0) return 'overdue';
  
  // Consider at risk if deadline is close or progress is too low compared to time remaining
  if (daysRemaining <= 7 || (daysRemaining <= 30 && progress < 50)) {
    return 'at-risk';
  }
  
  return 'on-track';
}

// Generate color based on status
export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'on-track':
      return 'bg-blue-500';
    case 'at-risk':
      return 'bg-amber-500';
    case 'overdue':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

// Truncate long text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Get initials from a name
export function getInitials(name: string): string {
  if (!name) return '';
  
  const names = name.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

// Filter array by search query across multiple fields
export function filterByQuery(items: any[], query: string, fields: string[]): any[] {
  if (!query) return items;
  
  const lowercaseQuery = query.toLowerCase();
  return items.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowercaseQuery);
      }
      return false;
    });
  });
}

// Convert a business category to an icon name from Lucide
export function categoryToIconName(category: string): string {
  const mapping: Record<string, string> = {
    'Vendas': 'shopping-cart',
    'Finanças': 'dollar-sign',
    'Marketing': 'target',
    'RH': 'users',
    'Operações': 'settings',
    'Impostos': 'file-text',
    'Equipamentos': 'tool',
    'Utilidades': 'zap',
    'Investimentos': 'trending-up',
    'Serviços': 'briefcase',
  };
  
  return mapping[category] || 'circle';
}
