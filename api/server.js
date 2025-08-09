import 'dotenv/config';
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

// Development endpoint to list all available routes
app.get('/api/routes', (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ message: 'Not found' });
  }

  const routes = [];

  // Function to extract routes from express app
  const extractRoutes = (stack, basePath = '') => {
    stack.forEach(layer => {
      if (layer.route) {
        // Direct route
        const methods = Object.keys(layer.route.methods);
        methods.forEach(method => {
          routes.push({
            method: method.toUpperCase(),
            path: basePath + layer.route.path,
            description: getRouteDescription(method.toUpperCase(), basePath + layer.route.path)
          });
        });
      } else if (layer.name === 'router' && layer.regexp) {
        // Router middleware
        const routerBasePath = basePath + extractPathFromRegex(layer.regexp);
        if (layer.handle && layer.handle.stack) {
          extractRoutes(layer.handle.stack, routerBasePath);
        }
      }
    });
  };

  // Helper function to extract path from regex
  const extractPathFromRegex = (regex) => {
    const match = regex.source.match(/\^\\?\/(.+?)\\\//);
    return match ? '/' + match[1] : '';
  };

  // Helper function to get route descriptions
  const getRouteDescription = (method, path) => {
    const descriptions = {
      'GET /api/': 'API information',
      'GET /api/health': 'Health check',
      'POST /api/usuarios': 'Create user',
      'GET /api/usuarios': 'Get all users',
      'GET /api/usuarios/:username': 'Get user by username',
      'PUT /api/usuarios/:id': 'Update user',
      'DELETE /api/usuarios/:id': 'Delete user',
      'POST /api/usuarios/:username/recetas': 'Create recipe for user',
      'GET /api/usuarios/:username/recetas': 'Get user recipes',
      'GET /api/recetas/:id': 'Get recipe by ID',
      'PUT /api/recetas/:id': 'Update recipe',
      'DELETE /api/recetas/:id': 'Delete recipe',
      'POST /api/addresses': 'Create address',
      'GET /api/addresses': 'Get all addresses'
    };
    return descriptions[`${method} ${path}`] || 'No description available';
  };

  // Extract routes from the app
  extractRoutes(app._router.stack);

  // Sort routes by path
  routes.sort((a, b) => a.path.localeCompare(b.path));

  res.json({
    message: 'Available API routes (Development mode only)',
    baseUrl: `http://localhost:${port}`,
    swaggerDocs: `http://localhost:${port}/docs`,
    routes: routes
  });
});

// Serve static frontend only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../dist')));
}

const entryPoint = (req, res) => {
  const codespaceUrl = process.env.CODESPACE_NAME 
      ? `http://${process.env.CODESPACE_NAME}-5001.app.github.dev`
      : `${req.protocol}://${req.get('host')}`;
  res.json({
    name: 'Mi Recetario Azul API',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    docsUrl: `${codespaceUrl}/docs`,
    docs: '/docs',
    health: '/api/health',
    routes: '/api/routes',
    message: 'Bienvenido a la API de Mi Recetario Azul. Visita /api/routes para ver todos los endpoints.'
  });
}
app.get('/api/', entryPoint);
app.get('/', entryPoint);

// Catch-all for all other routes
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const indexPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../dist/index.html');
    return res.sendFile(indexPath);
  }
  res.status(404).json({
    error: 'Ruta no encontrada',
    environment: process.env.NODE_ENV || 'development',
    docs: '/docs',
    api: '/api/',
    message: 'Estás en el backend. Visita /docs para la documentación Swagger o /api/routes para los endpoints.'
  });
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