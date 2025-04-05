
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define our database schema
interface MyDB extends DBSchema {
  goals: {
    key: string;
    value: {
      id: string;
      title: string;
      description: string;
      targetValue: number;
      currentValue: number;
      dueDate: string;
      category: string;
      status: "em andamento" | "concluída" | "atrasada";
      priority: string;
      createdAt: string;
    };
    indexes: { 'by-date': string };
  };
  transactions: {
    key: string;
    value: {
      id: string;
      description: string;
      amount: number;
      type: 'income' | 'expense';
      category: string;
      date: string;
      account: string;
    };
    indexes: { 'by-date': string };
  };
}

let dbPromise: Promise<IDBPDatabase<MyDB>> | null = null;

// Initialize the database
const initDB = async (): Promise<IDBPDatabase<MyDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>('business-app-db', 1, {
      upgrade(db) {
        // Create goals store
        if (!db.objectStoreNames.contains('goals')) {
          const goalsStore = db.createObjectStore('goals', { keyPath: 'id' });
          goalsStore.createIndex('by-date', 'dueDate');
        }
        
        // Create transactions store
        if (!db.objectStoreNames.contains('transactions')) {
          const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id' });
          transactionsStore.createIndex('by-date', 'date');
        }
      },
    });
  }
  return dbPromise;
};

// Goals CRUD operations
export const getGoals = async () => {
  const db = await initDB();
  return db.getAll('goals');
};

export const addGoal = async (goal: MyDB['goals']['value']) => {
  const db = await initDB();
  return db.add('goals', goal);
};

export const updateGoal = async (goal: MyDB['goals']['value']) => {
  const db = await initDB();
  return db.put('goals', goal);
};

export const deleteGoal = async (id: string) => {
  const db = await initDB();
  return db.delete('goals', id);
};

// Transactions CRUD operations
export const getTransactions = async () => {
  const db = await initDB();
  return db.getAll('transactions');
};

export const addTransaction = async (transaction: MyDB['transactions']['value']) => {
  const db = await initDB();
  return db.add('transactions', transaction);
};

export const updateTransaction = async (transaction: MyDB['transactions']['value']) => {
  const db = await initDB();
  return db.put('transactions', transaction);
};

export const deleteTransaction = async (id: string) => {
  const db = await initDB();
  return db.delete('transactions', id);
};

// Mock API endpoints - these methods simulate a REST API using the IndexedDB
export const api = {
  goals: {
    getAll: getGoals,
    add: addGoal,
    update: updateGoal,
    delete: deleteGoal,
  },
  transactions: {
    getAll: getTransactions,
    add: addTransaction,
    update: updateTransaction,
    delete: deleteTransaction,
  }
};

export default api;
