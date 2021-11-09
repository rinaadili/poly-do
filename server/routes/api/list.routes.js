const express = require('express');
const router = express.Router();
const listController = require('../../controllers/listController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/getAllLists', authMiddleware.authenticateJWT, listController.getAllLists);
router.post('/userLists', authMiddleware.authenticateJWT,  listController.userLists);
router.post('/createUpdateList', authMiddleware.authenticateJWT,  listController.createUpdateList);
router.post('/listTasks', authMiddleware.authenticateJWT,  listController.getListTasks);
router.post('/assignTask', authMiddleware.authenticateJWT,  listController.assignTask);
router.post('/unAssignTask', authMiddleware.authenticateJWT,  listController.unAssignTask);
router.delete('/deleteList', authMiddleware.authenticateJWT,  listController.deleteList);
router.post('/getProjectLists', authMiddleware.authenticateJWT, listController.getProjectLists);

module.exports = router;