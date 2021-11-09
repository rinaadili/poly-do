const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/projectController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/allProjects', authMiddleware.authenticateJWT, projectController.getAllProjects);
router.post('/getUserProjects', authMiddleware.authenticateJWT, projectController.getUserProjects);
router.post('/projectDetails', authMiddleware.authenticateJWT, projectController.showProjectDetails);
router.get('/getProjectMembers', authMiddleware.authenticateJWT, projectController.getProjectMembers);
router.post('/createUpdateProject', authMiddleware.authenticateJWT, projectController.createUpdateProject);
router.delete('/deleteProject/:id', authMiddleware.authenticateJWT, projectController.deleteProject);
router.post('/addProjectMembers', authMiddleware.authenticateJWT, projectController.addProjectMembers);
router.delete('/removeProjectMembers', authMiddleware.authenticateJWT, projectController.removeProjectMembers);

module.exports = router;