// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {  getPosts, getPostsByUserId,uploadFile } = require('../controllers/postController');
router.get('/get', getPosts); 
router.get('/get/user/:userId', getPostsByUserId);
router.post('/upload', upload.single('image'), uploadFile);

module.exports = router;
