// sequelizeConfig.mjs
/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/example'
const environment = process.env.NODE_ENV || 'development';

let sequelize;

if (environment === 'production') {
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  });
} else {
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres"
  });
}

export default sequelize;