const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const { ensureAuth } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints relacionados con tareas dentro de metas
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - goalId
 *             properties:
 *               goalId:
 *                 type: string
 *                 example: 6657815b65e799497bd823a3
 *               title:
 *                 type: string
 *                 example: Leer capítulo 1
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-01
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */

router.get("/", ensureAuth, tasksController.getTasks);
router.get("/:id", ensureAuth, tasksController.getTaskById);
router.post("/", ensureAuth, tasksController.createTask);
router.put("/:id", ensureAuth, tasksController.updateTask);
router.delete("/:id", ensureAuth, tasksController.deleteTask);

module.exports = router;
