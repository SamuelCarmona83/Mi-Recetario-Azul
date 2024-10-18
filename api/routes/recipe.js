// recetaRoutes.mjs
import express from 'express';
import { crearReceta, obtenerRecetasUsuario, obtenerReceta, actualizarReceta, eliminarReceta } from '../controllers/recipe.js';

const router = express.Router();

router.post('/usuarios/:username/recetas', crearReceta);
router.get('/usuarios/:username/recetas', obtenerRecetasUsuario);
router.get('/recetas/:id', obtenerReceta);
router.put('/recetas/:id', actualizarReceta);
router.delete('/recetas/:id', eliminarReceta);

export default router;
