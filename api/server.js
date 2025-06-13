/* eslint-disable no-undef */
import  express from 'express'
import sequelize from "./sequelizeConfig.js"
import { swaggerSpec } from './swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import userRoutes from "./routes/user.js"
import recipeRoutes from "./routes/recipe.js"
import addressRoutes from "./routes/address.js"
// Import models for initial data setup
import Usuario from "./models/user.js"
import md5 from "blueimp-md5"
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoutes)
app.use('/api', recipeRoutes)
app.use('/api', addressRoutes)

// Health check endpoint for Docker
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../dist')));

app.get("/", (_, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get("/api/", (req, res) => {
  try {
    // Check if running inside a Codespace and construct the proper URL
    const codespaceUrl = process.env.CODESPACE_NAME 
      ? `http://${process.env.CODESPACE_NAME}-5001.app.github.dev`
      : `${req.protocol}://${req.get('host')}`;

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


sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida. 📍')
    return sequelize.sync({
      alter: true
    })
  })
  .then(async () => {
    // Create default user if it doesn't exist
    try {
      const [user, created] = await Usuario.findOrCreate({
        where: { username: 'beli' },
        defaults: {
          username: 'beli',
          name: 'Beli',
          email: 'beli@example.com',
          password: md5('password123'),
          isActive: true
        }
      });
      if (created) {
        console.log('🙋‍♀️ Default user "beli" created');
      } else {
        console.log('👤 User "beli" already exists');
      }
    } catch (error) {
      console.log('⚠️ Could not create default user:', error.message);
    }

    app.listen(port, () => {
      console.log(`Servidor Express en funcionamiento en el puerto ${port}.`)
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error)
  });