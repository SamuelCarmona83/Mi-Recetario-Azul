import Usuario from './user.js';  // Importa el modelo de Usuario
import Receta from './recipes.js';    // Importa el modelo de Receta
import Address from './address.js';

// Define y relaciona los modelos
const setupModels = (sequelize) => {
    const models = {
        Usuario: Usuario.init({}, { sequelize }),   // Pasa la instancia de Sequelize
        Receta: Receta.init({}, { sequelize }),
        Address: Address.init({}, { sequelize })     // Pasa la instancia de Sequelize
    };

  // Establece las relaciones entre los modelos
  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });

  return models;
};

export default setupModels;