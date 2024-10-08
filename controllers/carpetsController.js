const Carpet = require('../models/Carpet');

exports.getCarpets = async (req, res) => {
    try {
        const carpets = await Carpet.find();
        res.status(200).json(carpets);
    } catch (err) {
        console.error('Error al obtener las carpetas:', err.message);
        res.status(500).json({ message: 'Error al obtener las carpetas' });
    }
};

exports.createCarpet = async (req, res) => {
    const { name, description, themeNumber, owner, usersAllowed } = req.body;

    if (!name || !themeNumber || !owner) {
        return res.status(400).json({ message: 'Faltan datos necesarios para crear la carpeta' });
    }

    try {
        const carpet = new Carpet({
            name,
            description,
            themeNumber,
            owner,
            usersAllowed
        });

        await carpet.save();
        res.status(201).json({ message: 'Carpeta creada exitosamente', carpet });
    } catch (err) {
        console.error('Error al crear la carpeta:', err.message);
        res.status(500).json({ message: 'Error al crear la carpeta' });
    }
};
