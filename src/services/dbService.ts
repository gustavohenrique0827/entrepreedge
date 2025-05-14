
// Define the database service

const dbService = {
  courses: {
    getAll: async () => {
      const courses = localStorage.getItem('courses');
      return courses ? JSON.parse(courses) : [];
    },
    saveAll: async (courses: any[]) => {
      localStorage.setItem('courses', JSON.stringify(courses));
      return courses;
    }
  },
  users: {
    getAll: async () => {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    },
    saveAll: async (users: any[]) => {
      localStorage.setItem('users', JSON.stringify(users));
      return users;
    }
  },
  tasks: {
    getAll: async () => {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    },
    saveAll: async (tasks: any[]) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return tasks;
    }
  },
  products: {
    getAll: async () => {
      const products = localStorage.getItem('products');
      return products ? JSON.parse(products) : [];
    },
    saveAll: async (products: any[]) => {
      localStorage.setItem('products', JSON.stringify(products));
      return products;
    }
  },
  transactions: {
    getAll: async () => {
      const transactions = localStorage.getItem('transactions');
      return transactions ? JSON.parse(transactions) : [];
    },
    saveAll: async (transactions: any[]) => {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      return transactions;
    }
  }
};

export { dbService };
export default dbService;
