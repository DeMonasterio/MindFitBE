const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { getUsers, getUserByEmail, registerUser, loginUser, uploadFile } = require('../controllers/userController');

router.get('/get', getUsers);
router.get('/get/:email', getUserByEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);
// Ruta para subir una imagen
// router.post('/upload', upload.single('file'), uploadFile); "Mala linea"

module.exports = router;
