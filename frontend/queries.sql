INSERT INTO users (name, email, password, role, availability)
VALUES 
  ('Admin User', 'admin@example.com', '$2a$12$/wC7PRnma3uL2IwPL0pnzeErFoWym/CPzK2K39UdJmnlquPw/GY1u', 'admin', true),
  ('Worker One', 'worker@example.com', '$2a$12$mAs.r7qDKnRXuBr5Q8zR/uN1yxwL6V9ThtpXo3SS84G84kja5tL5O', 'worker', true), 
  ('John', 'user@example.com', '$2a$12$pJs09iBIK1rnkUYEPC1nveBVUuTLi8R4TBb02eJcVk7y2ypCNHvbq', 'user', true); 



CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  urgency TEXT DEFAULT 'Medium',
  status TEXT DEFAULT 'Pending',
  landmark TEXT,
  assigned_to INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  availability BOOLEAN DEFAULT TRUE
);
