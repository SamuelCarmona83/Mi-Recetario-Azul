// RecetaController.mjs
import Receta from '../models/recipes.js';
import Usuario from '../models/user.js';

// Crear una nueva receta para un usuario
export const crearReceta = async (req, res) => {
  try {
    const { username } = req.params;
    const usuario = await Usuario.findOne(
      {
        where: {
          username
        }
      },
    );
    //console.log(req.body)
    const nuevaReceta = await Receta.create({ ...req.body, usuarioId : usuario.id });
    
    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la receta ' +  error});
  }
};

// Obtener todas las recetas de un usuario
export const obtenerRecetasUsuario = async (req, res) => {
  const { username } = req.params;

  const searchedUser = await Usuario.findOne({
    where: {
      username
    }
  });

  if (!searchedUser) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  try {
    const recetas = await Usuario.findOne(
      {
        where: {
          username
        },
        attributes: ['id', 'name'], // List the columns you want
        include: [
          {
            model: Receta,
            as: 'recetas', // Nombre de la asociación definida en el modelo de Usuario
          },
        ],
      },
    );
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recetas del usuario '+ error });
  }
};

// Obtener una receta por ID
export const obtenerReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id);
    if (receta) {
      res.status(200).json(receta);
    } else {
      res.status(404).json({ mensaje: 'Receta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la receta' });
  }
};

// Actualizar una receta por ID
export const actualizarReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const [actualizado] = await Receta.update(req.body, {
      where: { id },
    });
    if (actualizado) {
      const recetaActualizada = await Receta.findByPk(id);
      res.status(200).json(recetaActualizada);
    } else {
      res.status(404).json({ mensaje: 'Receta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la receta' });
  }
};

// Eliminar una receta por ID
export const eliminarReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Receta.destroy({
      where: { id },
    });
    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ mensaje: 'Receta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la receta' });
  }
};