const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goalsController");
const { ensureAuth } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Endpoints relacionados con metas personales
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Obtener todas las metas del usuario autenticado
 *     tags: [Goals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de metas
 *   post:
 *     summary: Crear una nueva meta
 *     tags: [Goals]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Leer un libro
 *               description:
 *                 type: string
 *                 example: Terminar 1 libro este mes
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-30
 *     responses:
 *       201:
 *         description: Meta creada
 */

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Obtener una meta por ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la meta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meta encontrada
 *       404:
 *         description: Meta no encontrada
 *   put:
 *     summary: Actualizar una meta por ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la meta
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Meta actualizada
 *   delete:
 *     summary: Eliminar una meta por ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la meta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meta eliminada
 */

router.get("/", ensureAuth, goalsController.getGoals);
router.get("/:id", ensureAuth, goalsController.getGoalById);
router.post("/", ensureAuth, goalsController.createGoal);
router.put("/:id", ensureAuth, goalsController.updateGoal);
router.delete("/:id", ensureAuth, goalsController.deleteGoal);

module.exports = router;
