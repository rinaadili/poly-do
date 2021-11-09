const router = require('express').Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/verifyToken', authController.verifyToken);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/getAllUsers', authMiddleware.authenticateJWT, authController.getAllUsers);
router.get('/getUserDetails', authMiddleware.authenticateJWT, authController.getUserDetails);
router.post('/updateUserDetails', authMiddleware.authenticateJWT,  authController.updateUserDetails);
router.post('/logout', authMiddleware.authenticateJWT, authController.logout);

module.exports = router;