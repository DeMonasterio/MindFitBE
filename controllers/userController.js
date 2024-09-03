const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { username, email, password, birthday } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        user = new User({ username, email, password, birthday });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error('Error al registrar el usuario:', err);  // Agrega más detalles en el log
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'El usuario no existe' });
            } else if (user.password !== password) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }
            
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }

exports.uploadFile = (req, res) => {
        if (!req.file) {
          return res.status(400).json({ error: 'No se cargó ningún archivo.' });
        }
        
        res.status(200).json({ file: req.file });
      };      
};
