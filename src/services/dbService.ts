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
  
  products: {
    getAll: async () => {
      // Mock data for products
      return [
        {
          id: '1',
          name: 'Cadeira de Escritório',
          description: 'Cadeira ergonômica para escritório com apoio lombar',
          price: 599.90,
          stock: 15,
          category: 'Móveis',
          sku: 'CAD-001',
          status: 'active',
          createdAt: '2023-05-10T14:30:00Z',
          updatedAt: '2023-05-10T14:30:00Z'
        },
        {
          id: '2',
          name: 'Monitor Ultrawide',
          description: 'Monitor ultrawide de 34 polegadas com resolução 4K',
          price: 2499.90,
          stock: 5,
          category: 'Eletrônicos',
          sku: 'MON-002',
          status: 'active',
          createdAt: '2023-05-11T10:15:00Z',
          updatedAt: '2023-05-11T10:15:00Z'
        },
        {
          id: '3',
          name: 'Teclado Mecânico',
          description: 'Teclado mecânico com switches blue e iluminação RGB',
          price: 299.90,
          stock: 0,
          category: 'Periféricos',
          sku: 'TEC-003',
          status: 'out_of_stock',
          createdAt: '2023-05-12T09:45:00Z',
          updatedAt: '2023-05-12T09:45:00Z'
        }
      ];
    },

    add: async (product) => {
      // Mock API call
      console.log('Adding product:', product);
      return product;
    },

    update: async (product) => {
      // Mock API call
      console.log('Updating product:', product);
      return product;
    },

    delete: async (id) => {
      // Mock API call
      console.log('Deleting product:', id);
      return true;
    }
  }
};

export default api;
