const Post = require('../models/Post');
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        // Convertir la imagen a base64
        const postsWithBase64Images = posts.map(post => {
            if (post.image) {
                return {
                    ...post.toObject(),
                    image: post.image.toString('base64'), // Convierte el buffer a base64
                };
            }
            return post;
        });

        res.status(200).json(postsWithBase64Images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

const getPostsByUserId = async (req, res) => {
    const { userId } = req.params; // Obtenemos el userId de los parámetros de la ruta

    try {
        const posts = await Post.find({ author: userId }) // Busca publicaciones por author
            .populate('author', 'username email') // Rellena los datos del autor
            .sort({ createdAt: -1 }); // Ordena las publicaciones por fecha

        // Convertir la imagen a base64
        const postsWithBase64Images = posts.map(post => {
            if (post.image) {
                return {
                    ...post.toObject(),
                    image: post.image.toString('base64'), // Convierte el buffer a base64
                };
            }
            return post;
        });

        res.status(200).json(postsWithBase64Images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        

        const { title, content, author, theme } = req.body;

        if (!title || !content || !author || !theme) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newPost = new Post({
            title,
            content,
            author, 
            theme,
            image: req.file.buffer,
        });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error saving post', error: error.message });
    }
};

module.exports = { getPosts, getPostsByUserId, uploadFile };
