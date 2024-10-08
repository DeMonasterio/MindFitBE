const express = require('express');
const router = express.Router();
// const upload = require('../config/multer');
const { getUsers, getUserByEmail, registerUser, loginUser } = require('../controllers/userController');

router.get('/get', getUsers);
router.get('/get/:email', getUserByEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/upload', upload.single('file'), uploadFile);
module.exports = router;
