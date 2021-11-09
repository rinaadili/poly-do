const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/taskController');
const authMiddleware = require('../../middleware/authMiddleware');


router.post('/getProjectTasks', authMiddleware.authenticateJWT, tasksController.getProjectTasks);
router.post('/getUserTasks', authMiddleware.authenticateJWT, tasksController.getUserTasks);
router.post('/createOrUpdateTask', authMiddleware.authenticateJWT, tasksController.createOrUpdateTask);
router.post('/assignTask', authMiddleware.authenticateJWT, tasksController.assignTask);
router.post('/unAssignTask', authMiddleware.authenticateJWT, tasksController.unAssignTask);
router.post('/getTasksByStatus', authMiddleware.authenticateJWT, tasksController.getTasksByStatus);
router.post('/getTaskDetails', authMiddleware.authenticateJWT, tasksController.getTaskDetails);
router.delete('/deleteTask', authMiddleware.authenticateJWT, tasksController.deleteTask);
router.post('/createUpdateSubTask', authMiddleware.authenticateJWT, tasksController.createUpdateSubtask);
router.post('/getTaskSubTasks', authMiddleware.authenticateJWT, tasksController.getTaskSubTasks);
router.post('/getSubtaskDetails', authMiddleware.authenticateJWT, tasksController.getSubtaskDetails);
router.post('/assignSubtask', authMiddleware.authenticateJWT, tasksController.assignSubTask);
router.delete('/deleteSubtask', authMiddleware.authenticateJWT, tasksController.deleteSubtask);

module.exports = router;