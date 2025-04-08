
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isAdmin: boolean;
  isActive: boolean;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  description?: string;
  price: number;
  billingInterval: 'monthly' | 'yearly';
  maxUsers: number;
  storageGb: number;
  backupFrequency: 'none' | 'weekly' | 'daily' | 'hourly';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: number;
  name: string;
  codeName: string;
  description?: string;
  iconName?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSubscription {
  id: number;
  userId: number;
  planId: number;
  status: 'active' | 'canceled' | 'expired' | 'trial';
  startedAt: Date;
  expiresAt?: Date;
  canceledAt?: Date;
  paymentMethod?: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Joined fields
  plan?: SubscriptionPlan;
}

export interface Goal {
  id: string | number;
  userId: number;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  dueDate: string; // ISO date string
  category: string;
  status: 'em andamento' | 'concluída' | 'atrasada';
  priority: string;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface FinancialTransaction {
  id: number;
  userId: number;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description?: string;
  category?: string;
  transactionDate: string; // ISO date string
  paymentMethod?: string;
  status: 'pending' | 'completed' | 'canceled';
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  parentTransactionId?: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Account {
  id: number;
  userId: number;
  name: string;
  type?: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  durationMinutes?: number;
  isPremium: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  
  // Joined fields
  lessons?: CourseLesson[];
  progress?: UserCourseProgress;
}

export interface CourseLesson {
  id: number;
  courseId: number;
  title: string;
  content?: string;
  videoUrl?: string;
  position: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserCourseProgress {
  userId: number;
  courseId: number;
  lastLessonId?: number;
  progressPercentage: number;
  completed: boolean;
  startedAt: string; // ISO date string
  completedAt?: string; // ISO date string
}

export interface UserSettings {
  userId: number;
  language: string;
  darkMode: boolean;
  currency: string;
  fontSize: 'small' | 'medium' | 'large';
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  timezone: string;
  updatedAt: string; // ISO date string
}
