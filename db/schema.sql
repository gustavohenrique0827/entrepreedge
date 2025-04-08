
-- Database schema for the EntrepreEdge system

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_admin BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

-- Subscription Plans Table
CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_interval VARCHAR(20) NOT NULL DEFAULT 'monthly',
    max_users INTEGER NOT NULL DEFAULT 1,
    storage_gb INTEGER NOT NULL DEFAULT 1,
    backup_frequency VARCHAR(20) DEFAULT 'none',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Modules Table
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Plan Modules Table (junction table for many-to-many)
CREATE TABLE plan_modules (
    plan_id INTEGER REFERENCES subscription_plans(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, module_id)
);

-- User Subscriptions Table
CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES subscription_plans(id),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    payment_method VARCHAR(50),
    payment_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Goals Table
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_value DECIMAL(15, 2),
    current_value DECIMAL(15, 2) DEFAULT 0,
    due_date DATE,
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'em andamento',
    priority VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial Transactions Table
CREATE TABLE financial_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL, -- 'income', 'expense', 'transfer'
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    transaction_date DATE NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(20) DEFAULT 'completed',
    recurrence_type VARCHAR(20), -- 'daily', 'weekly', 'monthly', 'yearly', NULL for one-time
    parent_transaction_id INTEGER REFERENCES financial_transactions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accounts Table (for financial module)
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50), -- 'checking', 'savings', 'credit', 'investment', etc.
    balance DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'BRL',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table (for learning module)
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    thumbnail_url VARCHAR(255),
    duration_minutes INTEGER,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Course Lessons Table
CREATE TABLE course_lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    video_url VARCHAR(255),
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Course Progress Table
CREATE TABLE user_course_progress (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    last_lesson_id INTEGER REFERENCES course_lessons(id),
    progress_percentage DECIMAL(5, 2) DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, course_id)
);

-- User Settings Table
CREATE TABLE user_settings (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
    language VARCHAR(5) DEFAULT 'pt-BR',
    dark_mode BOOLEAN DEFAULT false,
    currency VARCHAR(3) DEFAULT 'BRL',
    font_size VARCHAR(10) DEFAULT 'medium',
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, max_users, storage_gb, backup_frequency) VALUES
('Gratuito', 'Plano básico gratuito', 0, 1, 1, 'none'),
('Iniciante', 'Ideal para pequenas empresas', 199, 3, 5, 'weekly'),
('Empresarial', 'Para médias empresas em crescimento', 699, 15, 50, 'daily'),
('Premium', 'Para grandes empresas', 2499, 999, 500, 'hourly');

-- Insert available modules
INSERT INTO modules (name, code_name, description, icon_name) VALUES
('Financeiro', 'financial', 'Módulo de gestão financeira e fluxo de caixa', 'dollar-sign'),
('Vendas', 'sales', 'Módulo de vendas e faturamento', 'shopping-cart'),
('Estoque', 'inventory', 'Gestão de estoque e produtos', 'package'),
('CRM', 'crm', 'Gerenciamento de relacionamento com clientes', 'users'),
('RH', 'hr', 'Gestão de recursos humanos e colaboradores', 'user'),
('Projetos', 'projects', 'Gerenciamento de projetos e tarefas', 'clipboard'),
('Metas', 'goals', 'Definição e acompanhamento de metas e objetivos', 'target'),
('Análises', 'analytics', 'Dashboards e relatórios analíticos', 'bar-chart'),
('Marketing', 'marketing', 'Campanhas e ações de marketing', 'mail');

-- Add modules to plans (Plano Gratuito)
INSERT INTO plan_modules (plan_id, module_id)
SELECT 1, id FROM modules WHERE code_name = 'financial';

-- Add modules to plans (Plano Iniciante)
INSERT INTO plan_modules (plan_id, module_id)
SELECT 2, id FROM modules WHERE code_name IN ('financial', 'sales', 'goals', 'analytics');

-- Add modules to plans (Plano Empresarial)
INSERT INTO plan_modules (plan_id, module_id)
SELECT 3, id FROM modules WHERE code_name IN ('financial', 'sales', 'inventory', 'crm', 'projects', 'goals', 'analytics', 'marketing');

-- Add modules to plans (Plano Premium)
INSERT INTO plan_modules (plan_id, module_id)
SELECT 4, id FROM modules WHERE code_name IN ('financial', 'sales', 'inventory', 'crm', 'hr', 'projects', 'goals', 'analytics', 'marketing');
