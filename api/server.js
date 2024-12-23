/* eslint-disable no-undef */
import  express from 'express'
import sequelize from "./sequelizeConfig.js"
import { swaggerSpec } from './swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import userRoutes from "./routes/user.js"
import recipeRoutes from "./routes/recipe.js"
import addressRoutes from "./routes/address.js"

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRoutes)
app.use(recipeRoutes)
app.use(addressRoutes)

app.get("/", (req, res) => {
  try {
    // Check if running inside a Codespace and construct the proper URL
    const codespaceUrl = process.env.CODESPACE_NAME 
      ? `http://${process.env.CODESPACE_NAME}-5001.app.github.dev` // Correct URL format for GitHub Codespaces
      : `${req.protocol}://${req.get('host')}`; // Fallback for local development or other environments

    

    res.status(200).json({
      message: "connected to api 📕",
      docs: `${codespaceUrl}/docs`,
    });
  } catch (error) {
    res.status(400).json({ error: 'Error ' + error });
  }
});

app.delete("/restart_db", (req, res) => {
  sequelize.drop()
    .then(() => {
      return sequelize.sync();
    })
    .then(() => {
      res.status(200).json({ message: "Database restarted successfully." });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error restarting the database: ' + error });
    });
})



// Conexión a la base de datos y sincronización de modelos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida. 📍')
    return sequelize.sync({
      alter: true
    }) // Esto sincroniza los modelos con la base de datos
  })
  .then(() => {
    //console.log('Modelos sincronizados con la base de datos.');
    app.listen(port, () => {
      console.log(`Servidor Express en funcionamiento en el puerto ${port}.`)
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error)
  });