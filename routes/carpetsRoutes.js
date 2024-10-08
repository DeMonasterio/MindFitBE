const express = require('express');
const router = express.Router();
const { getCarpets, createCarpet } = require('../controllers/carpetsController'); 
router.get('/carpets', getCarpets);

router.post('/carpets', createCarpet); 

module.exports = router;
