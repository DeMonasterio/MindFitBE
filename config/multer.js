// config/multer.js
const multer = require('multer');

// Configuración del almacenamiento de archivos
const storage = multer.memoryStorage(); // Guarda archivos en memoria
const upload = multer({ storage });

module.exports = upload;
