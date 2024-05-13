const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming the path to your Post model

/* Create a GET all route */
router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetching the Post list" });
    }
});

/* Get by id */
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetching the Post" });
    }
});

/* Create a POST route */
router.post('/', async (req, res) => {
    try {
        const { title, summary, content, file } = req.body;

        const newPost = new Post({
            title,
            summary,
            content,
            file
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/* Update a post */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, content, file } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(id, { title, summary, content, file }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/* Delete a post */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
