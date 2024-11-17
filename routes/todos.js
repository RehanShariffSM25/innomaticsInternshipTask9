const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

// Create a new to-do
router.post('/', async (req, res, next) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    try {
        const todo = new Todo({
            title,
            description
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        next(err);
    }
});

// Retrieve all to-dos
router.get('/', async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
});

// Retrieve a specific to-do by ID
router.get('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "To-do not found" });
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
});

// Update a specific to-do by ID
router.put('/:id', async (req, res, next) => {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ error: "To-do not found" });
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
});

// Delete a specific to-do by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ error: "To-do not found" });
        res.status(200).json({ message: "To-do item deleted successfully" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
