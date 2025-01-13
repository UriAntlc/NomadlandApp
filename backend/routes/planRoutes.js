// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/insertarLugar', verifyToken,planController.insertarLugar);
router.post('/nuevoPlan', verifyToken,planController.nuevoPlan);
router.put('/nombrePlanPerfil', verifyToken,planController.nombrePlanPerfil);
router.put('/nombrePlan', verifyToken,planController.nombrePlan);
router.get('/obtenerPlan', verifyToken, planController.obtenerPlan);
router.get('/verPlanes', verifyToken, planController.verPlanes);
router.get('/obtenerFavorita', verifyToken, planController.obtenerFavorita)
router.get('/obtenerActividades', verifyToken, planController.obtenerActividades)
router.post('/planPerfil', verifyToken, planController.planPerfil)
router.delete('/deleteActividad', verifyToken, planController.deleteActividad);
router.delete('/eliminarPlan', verifyToken, planController.eliminarPlan);
router.delete('/eliminarFavorita', verifyToken, planController.eliminarFavorita);
router.post('/agregarPlan', verifyToken, planController.agregarPlan);

module.exports = router;