import  express from 'express'
import sequelize from "./sequelizeConfig.js"
import cors from 'cors';
import userRoutes from "./routes/user.js"
import recipeRoutes from "./routes/recipe.js"

const app = express()
const port = 5001

app.use(express.json())
app.use(cors())

app.use(userRoutes)
app.use(recipeRoutes)

app.get("/", (req, res) => {
  try{
    res.status(200).json({ message: "connected to api 📕" });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la receta ' +  error});
  }
})

// Conexión a la base de datos y sincronización de modelos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida. 📍')
    return sequelize.sync() // Esto sincroniza los modelos con la base de datos
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