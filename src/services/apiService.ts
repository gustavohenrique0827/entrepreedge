import dbService from './dbService';

const api = {
  courses: {
    getAll: async () => {
      const courses = await dbService.courses.getAll();
      return courses;
    },
    getById: async (id: string) => {
      const courses = await dbService.courses.getAll();
      const course = courses.find(c => c.id === id);
      return course;
    },
    add: async (course: any) => {
      const courses = await dbService.courses.getAll();
      const newCourse = {
        id: Date.now().toString(),
        ...course,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      courses.push(newCourse);
      await dbService.courses.saveAll(courses);
      return newCourse;
    },
    update: async (course: any) => {
      const courses = await dbService.courses.getAll();
      const index = courses.findIndex(c => c.id === course.id);
      if (index !== -1) {
        courses[index] = {
          ...courses[index],
          ...course,
          updatedAt: new Date().toISOString()
        };
        await dbService.courses.saveAll(courses);
        return courses[index];
      }
      return null;
    },
    delete: async (id: string) => {
      const courses = await dbService.courses.getAll();
      const index = courses.findIndex(c => c.id === id);
      if (index !== -1) {
        const deletedCourse = courses[index];
        courses.splice(index, 1);
        await dbService.courses.saveAll(courses);
        return deletedCourse;
      }
      return null;
    }
  },
  users: {
    getAll: async () => {
      const users = await dbService.users.getAll();
      return users;
    },
    getById: async (id: string) => {
      const users = await dbService.users.getAll();
      const user = users.find(u => u.id === id);
      return user;
    },
    add: async (user: any) => {
       const users = await dbService.users.getAll();
        const newUser = {
          id: Date.now().toString(),
          ...user,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        users.push(newUser);
        await dbService.users.saveAll(users);
        return newUser;
    },
    update: async (user: any) => {
      const users = await dbService.users.getAll();
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = {
          ...users[index],
          ...user,
          updatedAt: new Date().toISOString()
        };
        await dbService.users.saveAll(users);
        return users[index];
      }
      return null;
    },
    delete: async (id: string) => {
      const users = await dbService.users.getAll();
      const index = users.findIndex(u => u.id === id);
      if (index !== -1) {
        const deletedUser = users[index];
        users.splice(index, 1);
        await dbService.users.saveAll(users);
        return deletedUser;
      }
      return null;
    }
  },
  tasks: {
    getAll: async () => {
      const tasks = await dbService.tasks.getAll();
      return tasks;
    },
    getById: async (id: string) => {
      const tasks = await dbService.tasks.getAll();
      const task = tasks.find(t => t.id === id);
      return task;
    },
    add: async (task: any) => {
      const tasks = await dbService.tasks.getAll();
      const newTask = {
        id: Date.now().toString(),
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tasks.push(newTask);
      await dbService.tasks.saveAll(tasks);
      return newTask;
    },
    update: async (task: any) => {
      const tasks = await dbService.tasks.getAll();
      const index = tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        tasks[index] = {
          ...tasks[index],
          ...task,
          updatedAt: new Date().toISOString()
        };
        await dbService.tasks.saveAll(tasks);
        return tasks[index];
      }
      return null;
    },
    delete: async (id: string) => {
      const tasks = await dbService.tasks.getAll();
      const index = tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        const deletedTask = tasks[index];
        tasks.splice(index, 1);
        await dbService.tasks.saveAll(tasks);
        return deletedTask;
      }
      return null;
    }
  },
  products: {
    getAll: async () => {
      const products = await dbService.products.getAll();
      return products;
    },
    getById: async (id: string) => {
      const products = await dbService.products.getAll();
      const product = products.find(p => p.id === id);
      return product;
    },
    add: async (product: any) => {
      const products = await dbService.products.getAll();
      const newProduct = {
        id: Date.now().toString(),
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      products.push(newProduct);
      await dbService.products.saveAll(products);
      return newProduct;
    },
    update: async (product: any) => {
      const products = await dbService.products.getAll();
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...product,
          updatedAt: new Date().toISOString()
        };
        await dbService.products.saveAll(products);
        return products[index];
      }
      return null;
    },
    delete: async (id: string) => {
      const products = await dbService.products.getAll();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        const deletedProduct = products[index];
        products.splice(index, 1);
        await dbService.products.saveAll(products);
        return deletedProduct;
      }
      return null;
    }
  },
  transactions: {
    getAll: async () => {
      const transactions = await dbService.transactions.getAll();
      return transactions;
    },
    getById: async (id: string) => {
      const transactions = await dbService.transactions.getAll();
      const transaction = transactions.find(t => t.id === id);
      return transaction;
    },
    add: async (transaction: any) => {
      const transactions = await dbService.transactions.getAll();
      const newTransaction = {
        id: Date.now().toString(),
        ...transaction,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      transactions.push(newTransaction);
      await dbService.transactions.saveAll(transactions);
      return newTransaction;
    },
    update: async (transaction: any) => {
      const transactions = await dbService.transactions.getAll();
      const index = transactions.findIndex(t => t.id === transaction.id);
      if (index !== -1) {
        transactions[index] = {
          ...transactions[index],
          ...transaction,
          updatedAt: new Date().toISOString()
        };
        await dbService.transactions.saveAll(transactions);
        return transactions[index];
      }
      return null;
    },
    delete: async (id: string) => {
      const transactions = await dbService.transactions.getAll();
      const index = transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        const deletedTransaction = transactions[index];
        transactions.splice(index, 1);
        await dbService.transactions.saveAll(transactions);
        return deletedTransaction;
      }
      return null;
    }
  },
  goals: {
    getAll: async () => {
      const goals = await dbService.goals.getAll();
      return goals;
    },
    getById: async (id: string) => {
      const goals = await dbService.goals.getAll();
      const goal = goals.find(g => g.id === id);
      return goal;
    },
    add: async (goal: any) => {
      const goals = await dbService.goals.getAll();
      const newGoal = {
        id: Date.now().toString(),
        ...goal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      goals.push(newGoal);
      await dbService.goals.saveAll(goals);
      return newGoal;
    },
    update: async (goal: any) => {
      const goals = await dbService.goals.getAll();
      const index = goals.findIndex(g => g.id === goal.id);
      if (index !== -1) {
        goals[index] = {
          ...goals[index],
          ...goal,
          updatedAt: new Date().toISOString()
        };
        await dbService.goals.saveAll(goals);
        return goals[index];
      }
      return null;
    },
    delete: async (id: string) => {
      const goals = await dbService.goals.getAll();
      const index = goals.findIndex(g => g.id === id);
      if (index !== -1) {
        const deletedGoal = goals[index];
        goals.splice(index, 1);
        await dbService.goals.saveAll(goals);
        return deletedGoal;
      }
      return null;
    }
  }
};

export const syncWithServer = async () => {
  // Mock implementation for synchronizing with a server
  console.log('Syncing data with server...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Sync complete');
      resolve(true);
    }, 1000);
  });
};

export { api };
export default api;
