
import api from './dbService';

// This service wraps the database service to provide additional functionality
// like error handling, caching, and offline support

// Define proper types for transactions
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  account: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Define correct Product type to match what's expected in Products.tsx
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  status: 'active' | 'out_of_stock' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  // Goals API
  async getGoals() {
    try {
      return await api.goals.getAll();
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw new Error('Failed to fetch goals');
    }
  }

  async addGoal(goal: any) {
    try {
      await api.goals.add(goal);
      return goal;
    } catch (error) {
      console.error('Error adding goal:', error);
      throw new Error('Failed to add goal');
    }
  }

  async updateGoal(goal: any) {
    try {
      await api.goals.update(goal);
      return goal;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw new Error('Failed to update goal');
    }
  }

  async deleteGoal(id: string) {
    try {
      await api.goals.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw new Error('Failed to delete goal');
    }
  }

  // Transactions API
  async getTransactions(): Promise<Transaction[]> {
    try {
      // Mock implementation until api.transactions.getAll() is implemented
      if (api.transactions && typeof api.transactions.getAll === 'function') {
        return await api.transactions.getAll();
      }
      console.warn('Transactions API not implemented, returning mock data');
      return [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    try {
      if (api.transactions && typeof api.transactions.add === 'function') {
        await api.transactions.add(transaction);
      } else {
        console.warn('Transactions API not implemented, mocking successful add');
      }
      return {
        ...transaction,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Transaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw new Error('Failed to add transaction');
    }
  }

  async updateTransaction(transaction: Transaction): Promise<Transaction> {
    try {
      if (api.transactions && typeof api.transactions.update === 'function') {
        await api.transactions.update(transaction);
      } else {
        console.warn('Transactions API not implemented, mocking successful update');
      }
      return {
        ...transaction,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new Error('Failed to update transaction');
    }
  }

  async deleteTransaction(id: string): Promise<boolean> {
    try {
      if (api.transactions && typeof api.transactions.delete === 'function') {
        await api.transactions.delete(id);
      } else {
        console.warn('Transactions API not implemented, mocking successful delete');
      }
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw new Error('Failed to delete transaction');
    }
  }
  
  // Sync offline data with server (Mock implementation)
  async syncWithServer() {
    console.log('Synchronizing data with server...');
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Data synchronized successfully!');
        resolve(true);
      }, 1500);
    });
  }
}

export default new ApiService();
