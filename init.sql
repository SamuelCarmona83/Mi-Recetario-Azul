-- Initialize the database if it doesn't exist
-- This file will be executed when the PostgreSQL container starts for the first time

-- Create the database if it doesn't exist
-- Note: The database name is taken from the POSTGRES_DB environment variable

-- Create any extensions you might need
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Your Sequelize models will handle table creation and the app will create default users
