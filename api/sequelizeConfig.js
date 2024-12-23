// sequelizeConfig.mjs
/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/example'

const sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
});

export default sequelize;