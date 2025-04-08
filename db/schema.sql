
-- Schema for the system database

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Subscription Plans
CREATE TABLE subscription_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  billing_interval ENUM('monthly', 'yearly') DEFAULT 'monthly',
  max_users INT NOT NULL,
  storage_gb INT NOT NULL,
  backup_frequency ENUM('none', 'weekly', 'daily', 'hourly') DEFAULT 'none',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Modules (features available in different plans)
CREATE TABLE modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code_name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Plan Modules (which modules are included in which plans)
CREATE TABLE plan_modules (
  plan_id INT NOT NULL,
  module_id INT NOT NULL,
  PRIMARY KEY (plan_id, module_id),
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- User Subscriptions
CREATE TABLE user_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id INT NOT NULL,
  status ENUM('active', 'canceled', 'expired', 'trial') DEFAULT 'trial',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  canceled_at TIMESTAMP NULL,
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

-- Goals
CREATE TABLE goals (
  id VARCHAR(36) PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_value DECIMAL(15, 2) NOT NULL,
  current_value DECIMAL(15, 2) NOT NULL DEFAULT 0,
  due_date DATE NOT NULL,
  category VARCHAR(100),
  status ENUM('em andamento', 'concluída', 'atrasada') DEFAULT 'em andamento',
  priority VARCHAR(50) DEFAULT 'Média',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Financial Transactions
CREATE TABLE financial_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('income', 'expense', 'transfer') NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  description VARCHAR(255),
  category VARCHAR(100),
  transaction_date DATE NOT NULL,
  payment_method VARCHAR(100),
  status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
  recurrence_type ENUM('daily', 'weekly', 'monthly', 'yearly') NULL,
  parent_transaction_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_transaction_id) REFERENCES financial_transactions(id) ON DELETE SET NULL
);

-- Accounts (Banking/Financial)
CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type ENUM('checking', 'savings', 'credit', 'investment') DEFAULT 'checking',
  balance DECIMAL(15, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'BRL',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  thumbnail_url VARCHAR(255),
  duration_minutes INT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Course Lessons
CREATE TABLE course_lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url VARCHAR(255),
  position INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- User Course Progress
CREATE TABLE user_course_progress (
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  last_lesson_id INT,
  progress_percentage INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (last_lesson_id) REFERENCES course_lessons(id) ON DELETE SET NULL
);

-- User Settings
CREATE TABLE user_settings (
  user_id INT PRIMARY KEY,
  language VARCHAR(10) DEFAULT 'pt-BR',
  dark_mode BOOLEAN DEFAULT FALSE,
  currency VARCHAR(3) DEFAULT 'BRL',
  font_size ENUM('small', 'medium', 'large') DEFAULT 'medium',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
  theme_primary_color VARCHAR(10) DEFAULT '#3b82f6', -- Brand color customization
  theme_secondary_color VARCHAR(10) DEFAULT '#10b981',
  logo_url VARCHAR(255) NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, billing_interval, max_users, storage_gb, backup_frequency) VALUES
('Plano Gratuito', 'Conheça o sistema', 0, 'monthly', 1, 1, 'none'),
('Plano Iniciante', 'Ideal para pequenas empresas', 199, 'monthly', 3, 5, 'weekly'),
('Plano Empresarial', 'Médias empresas em crescimento', 699, 'monthly', 15, 50, 'daily'),
('Plano Premium', 'Para grandes empresas', 2499, 'monthly', 999, 500, 'hourly');

-- Insert default modules
INSERT INTO modules (name, code_name, description, icon_name) VALUES
('Financeiro Básico', 'financial', 'Gerenciamento financeiro básico', 'dollar-sign'),
('Vendas', 'sales', 'Gestão de vendas e faturamento', 'shopping-cart'),
('Estoque', 'inventory', 'Controle de estoque', 'package'),
('CRM', 'crm', 'Gestão de relacionamento com clientes', 'users'),
('RH', 'hr', 'Recursos humanos', 'user'),
('Projetos', 'projects', 'Gestão de projetos', 'clipboard'),
('Metas', 'goals', 'Acompanhamento de metas', 'target'),
('Análises', 'analytics', 'Analytics e relatórios', 'bar-chart'),
('Marketing', 'marketing', 'Campanhas de marketing', 'megaphone');

-- Link modules to plans
-- Free plan: only financial basic
INSERT INTO plan_modules (plan_id, module_id) 
SELECT (SELECT id FROM subscription_plans WHERE name = 'Plano Gratuito'), 
       (SELECT id FROM modules WHERE code_name = 'financial');

-- Starter plan: financial, sales, goals, analytics
INSERT INTO plan_modules (plan_id, module_id)
SELECT (SELECT id FROM subscription_plans WHERE name = 'Plano Iniciante'),
       id FROM modules WHERE code_name IN ('financial', 'sales', 'goals', 'analytics');

-- Business plan: all except HR
INSERT INTO plan_modules (plan_id, module_id)
SELECT (SELECT id FROM subscription_plans WHERE name = 'Plano Empresarial'),
       id FROM modules WHERE code_name IN ('financial', 'sales', 'inventory', 'crm', 'projects', 'goals', 'analytics', 'marketing');

-- Premium plan: all modules
INSERT INTO plan_modules (plan_id, module_id)
SELECT (SELECT id FROM subscription_plans WHERE name = 'Plano Premium'),
       id FROM modules;
