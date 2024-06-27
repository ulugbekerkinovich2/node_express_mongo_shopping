const { Todo } = require('../models/todo.model');
const { User } = require('../models/user.model');
const Joi = require('joi');

const todoSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).max(255).required()
});

const getAuthenticatedUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
};

const getTodos = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        await getAuthenticatedUser(userId);
        const todos = await Todo.find({ userId });
        res.json({ message: "Success", data: todos });
    } catch (error) {
        res.status(error.message === "Unauthorized" ? 403 : 500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const { error } = todoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { name, description } = req.body;
        const userId = req.user.payload.id;
        await getAuthenticatedUser(userId);

        const findTodo = await Todo.findOne({ name, userId });
        if (findTodo) {
            return res.status(409).json({ message: "Todo already exists" });
        }

        const newTodo = new Todo({ name, description, userId });
        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully", data: newTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const { error } = todoSchema.validate({ name, description });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const userId = req.user.payload.id;
        await getAuthenticatedUser(userId);
        const updatedTodo = await Todo.findByIdAndUpdate(id, { $set: { name, description, userId } }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo updated successfully", data: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.payload.id;
        await getAuthenticatedUser(userId);
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully", data: deletedTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodo = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const { id } = req.params;
        await getAuthenticatedUser(userId);
        const findTodo = await Todo.findOne({ _id: id, userId });
        if (!findTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Success", data: findTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};
