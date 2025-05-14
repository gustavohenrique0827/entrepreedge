
import api from './dbService';

// This service wraps the database service to provide additional functionality
// like error handling, caching, and offline support

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

  async addGoal(goal) {
    try {
      await api.goals.add(goal);
      return goal;
    } catch (error) {
      console.error('Error adding goal:', error);
      throw new Error('Failed to add goal');
    }
  }

  async updateGoal(goal) {
    try {
      await api.goals.update(goal);
      return goal;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw new Error('Failed to update goal');
    }
  }

  async deleteGoal(id) {
    try {
      await api.goals.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw new Error('Failed to delete goal');
    }
  }

  // Transactions API
  async getTransactions() {
    try {
      return await api.transactions.getAll();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  async addTransaction(transaction) {
    try {
      await api.transactions.add(transaction);
      return transaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw new Error('Failed to add transaction');
    }
  }

  async updateTransaction(transaction) {
    try {
      await api.transactions.update(transaction);
      return transaction;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new Error('Failed to update transaction');
    }
  }

  async deleteTransaction(id) {
    try {
      await api.transactions.delete(id);
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
