// recetaRoutes.mjs
import express from 'express';
import { crearReceta, obtenerRecetasUsuario, obtenerReceta, actualizarReceta, eliminarReceta } from '../controllers/recipe.js';

const router = express.Router();

/**
 * @swagger
 * /usuarios/{username}/recetas:
 *   post:
 *     summary: Crea una nueva receta para un usuario
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario del creador de la receta
 *         example: juanperez
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la receta
 *                 example: "Pizza Margherita"
 *               time:
 *                 type: string
 *                 description: Tiempo de preparación
 *                 example: "30 minutos"
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la receta
 *                 example: "Receta tradicional italiana..."
 *               image:
 *                 type: string
 *                 description: URL de la imagen de la receta
 *                 example: "https://imagen-receta.com/pizza.jpg"
 *               difficulty:
 *                 type: string
 *                 description: Dificultad de la receta
 *                 example: "Fácil"
 *               vegan:
 *                 type: boolean
 *                 description: Indica si es una receta vegana
 *                 example: true
 *               spicy:
 *                 type: boolean
 *                 description: Indica si es una receta picante
 *                 example: false
 *     responses:
 *       201:
 *         description: Receta creada exitosamente
 *       400:
 *         description: Error al crear la receta
 */
router.post('/usuarios/:username/recetas', crearReceta);

/**
 * @swagger
 * /usuarios/{username}/recetas:
 *   get:
 *     summary: Obtiene todas las recetas de un usuario
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario del creador de las recetas
 *         example: juanperez
 *     responses:
 *       200:
 *         description: Lista de recetas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la receta
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre de la receta
 *                   example: "Pizza Margherita"
 *                 time:
 *                   type: string
 *                   description: Tiempo de preparación
 *                   example: "30 minutos"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la receta
 *                   example: "Receta tradicional italiana..."
 *                 image:
 *                   type: string
 *                   description: URL de la imagen de la receta
 *                   example: "https://imagen-receta.com/pizza.jpg"
 *                 difficulty:
 *                   type: string
 *                   description: Dificultad de la receta
 *                   example: "Fácil"
 *                 vegan:
 *                   type: boolean
 *                   description: Indica si es una receta vegana
 *                   example: true
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener las recetas
 */
router.get('/usuarios/:username/recetas', obtenerRecetasUsuario);

/**
 * @swagger
 * /recetas/{id}:
 *   get:
 *     summary: Obtiene una receta por su ID
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta
 *         example: 1
 *     responses:
 *       200:
 *         description: Detalles de la receta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la receta
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre de la receta
 *                   example: "Pizza Margherita"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la receta
 *                   example: "Receta tradicional italiana..."
 *                 image:
 *                   type: string
 *                   description: URL de la imagen de la receta
 *                   example: "https://imagen-receta.com/pizza.jpg"
 *                 difficulty:
 *                   type: string
 *                   description: Dificultad de la receta
 *                   example: "Fácil"
 *       404:
 *         description: Receta no encontrada
 *       500:
 *         description: Error al obtener la receta
 */
router.get('/recetas/:id', obtenerReceta);

/**
 * @swagger
 * /recetas/{id}:
 *   put:
 *     summary: Actualiza una receta por su ID
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la receta
 *                 example: "Pizza Margherita Actualizada"
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la receta
 *                 example: "Receta tradicional italiana actualizada..."
 *               difficulty:
 *                 type: string
 *                 description: Dificultad de la receta
 *                 example: "Media"
 *               image:
 *                 type: string
 *                 description: URL de la imagen de la receta
 *                 example: "https://imagen-receta.com/pizza_actualizada.jpg"
 *     responses:
 *       200:
 *         description: Receta actualizada exitosamente
 *       404:
 *         description: Receta no encontrada
 *       500:
 *         description: Error al actualizar la receta
 */
router.put('/recetas/:id', actualizarReceta);

/**
 * @swagger
 * /recetas/{id}:
 *   delete:
 *     summary: Elimina una receta por su ID
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta a eliminar
 *         example: 1
 *     responses:
 *       204:
 *         description: Receta eliminada exitosamente
 *       404:
 *         description: Receta no encontrada
 *       500:
 *         description: Error al eliminar la receta
 */
router.delete('/recetas/:id', eliminarReceta);

export default router;
