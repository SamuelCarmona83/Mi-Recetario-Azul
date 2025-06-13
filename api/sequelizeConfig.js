// sequelizeConfig.mjs
/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';

// Build database URL from environment variables or use default
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbName = process.env.DB_NAME || 'example';

const databaseUrl = process.env.DATABASE_URL || 
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const environment = process.env.NODE_ENV || 'development';

let sequelize;

if (environment === 'production') {
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false,
      } : undefined,
    },
    logging: false, // Disable logging in production
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: console.log // Enable logging in development
  });
}

export default sequelize;