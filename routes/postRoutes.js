// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {  getPosts, getPostById, getPostsByUserId, uploadFile, deletePost } = require('../controllers/postController');
router.get('/get', getPosts); 
router.get('/get/:id', getPostById); 
router.get('/get/user/:userId', getPostsByUserId);
router.post('/upload', upload.single('image'), uploadFile);
router.delete('/delete/:id', deletePost);

module.exports = router;
