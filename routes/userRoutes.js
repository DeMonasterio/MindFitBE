const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { registerUser, loginUser, uploadFile } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta para subir una imagen
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
