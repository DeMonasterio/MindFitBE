const Post = require('../models/Post');

const getPosts = async (req, res) => {
    try {
        
        const posts = await Post.find()
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        const postsWithBase64Images = posts.map(post => {
            if (post.image) {
                return {
                    ...post.toObject(),
                    image: post.image.toString('base64'),
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

const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id)
            .populate('author', 'username email');

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const postWithBase64Image = post.image
            ? {
                  ...post.toObject(),
                  image: post.image.toString('base64'),
              }
            : post.toObject();

        res.status(200).json(postWithBase64Image);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Error fetching post' });
    }
};

const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const posts = await Post.find({ author: userId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        const postsWithBase64Images = posts.map(post => {
            if (post.image) {
                return {
                    ...post.toObject(),
                    image: post.image.toString('base64'),
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

// Método para eliminar una publicación
const deletePost = async (req, res) => {
    const { id } = req.params;
    console.log("Hola")

    try {
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
};

module.exports = { getPosts, getPostById, getPostsByUserId, uploadFile, deletePost };
