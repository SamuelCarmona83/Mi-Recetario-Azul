// RecetaModel.mjs
import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeConfig.js';
// import Usuario from './user.js';  // Importa el modelo de Usuario

const Receta = sequelize.define('Receta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  vegan: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  spicy: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  fish: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  meat: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuarios', // Nombre de la tabla de Usuarios en la base de datos
      key: 'id',         // Nombre de la columna en la tabla de Usuarios
    },
  },
},{
  init: true
});


export default Receta;
