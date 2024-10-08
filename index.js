const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const carpetsRoutes = require('./routes/carpetsRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/carpets', carpetsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
