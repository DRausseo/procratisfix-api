const express = require("express");
const router = express.Router();
const routinesController = require("../controllers/routinesController");
const { ensureAuth } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Routines
 *   description: Endpoints relacionados con rutinas diarias del usuario
 */

/**
 * @swagger
 * /api/routines:
 *   get:
 *     summary: Obtener todas las rutinas
 *     tags: [Routines]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutinas
 *   post:
 *     summary: Crear una nueva rutina
 *     tags: [Routines]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - activities
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [morning, afternoon, evening]
 *                 example: morning
 *               activities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Despertar", "Meditar"]
 *               startTime:
 *                 type: string
 *                 example: "06:30"
 *     responses:
 *       201:
 *         description: Rutina creada exitosamente
 */

/**
 * @swagger
 * /api/routines/{id}:
 *   get:
 *     summary: Obtener una rutina por ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la rutina
 *     responses:
 *       200:
 *         description: Rutina encontrada
 *       404:
 *         description: Rutina no encontrada
 *   put:
 *     summary: Actualizar una rutina
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la rutina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               activities:
 *                 type: array
 *                 items:
 *                   type: string
 *               startTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *   delete:
 *     summary: Eliminar una rutina
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la rutina
 *     responses:
 *       200:
 *         description: Rutina eliminada
 */

router.get("/", ensureAuth, routinesController.getRoutines);
router.get("/:id", ensureAuth, routinesController.getRoutineById);
router.post("/", ensureAuth, routinesController.createRoutine);
router.put("/:id", ensureAuth, routinesController.updateRoutine);
router.delete("/:id", ensureAuth, routinesController.deleteRoutine);

module.exports = router;
