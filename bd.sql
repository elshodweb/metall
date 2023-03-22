CREATE TABLE user(
  id SERIAL NOT NULL,
  username VARCHAR(32) UNIQUE NOT NULL,
  title TEXT,
  about TEXT,
  imageUrl VARCHAR UNIQUE,
  created_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);



CREATE TABLE users(
  id SERIAL NOT NULL,
  username VARCHAR(32) UNIQUE NOT NULL,
  title TEXT,
  about TEXT,
  imageUrl VARCHAR(32) UNIQUE,
  created_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);
