// usuarioRoutes.mjs
import express from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/user.js';

const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan Perez"
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "juanperez123"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Perez"
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *                   example: "juanperez123"
 *       400:
 *         description: Error al crear el usuario
 */
router.post('/usuarios', crearUsuario);

/**
 * @swagger
 * /usuarios/{username}:
 *   get:
 *     summary: Obtiene un usuario por su nombre de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *         example: juanperez123
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Perez"
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *                   example: "juanperez123"
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/usuarios', obtenerUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza los datos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
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
 *                 description: Nombre del usuario
 *                 example: "Juan Perez Actualizado"
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "juanperez_updated"
 *               password:
 *                 type: string
 *                 description: Nueva contraseña (si se quiere actualizar)
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
router.get('/usuarios/:username', obtenerUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza los datos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
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
 *                 description: Nombre del usuario
 *                 example: "Juan Perez Actualizado"
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "juanperez_updated"
 *               password:
 *                 type: string
 *                 description: Nueva contraseña (si se quiere actualizar)
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */

router.put('/usuarios/:id', actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/usuarios/:id', eliminarUsuario);

export default router;
