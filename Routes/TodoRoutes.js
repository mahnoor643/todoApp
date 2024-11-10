const express = require("express");
const router = express.Router();
const Todo = require("../Models/Todo");
const { body, validationResult } = require("express-validator");

//create todo endpoint
router.post("/create",
    [
        body("title")
            .notEmpty()
            .isString()
            .isLength({ max: 100 })
            .withMessage("Title is required")
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ error: error });
        }
        try {
            const { title, description, isComplete } = req.body;
            const newTodo = new Todo({ title, description, isComplete });
            const savedTodo = await newTodo.save();
            res.status(201).json(savedTodo);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    });

//get all tasks
router.get("/getAll", async (req, res) => {
    try {
        const task = await Todo.find();
        if (task == null) {
            res.status(404).json({ error: "Not  Found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get tasks by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Todo.findOne({ _id: id });
        if (!task) {
            return res.status(404).json({ error: "task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//update task by id
router.put("/:id",
    [
        body("title")
            .notEmpty()
            .isString()
            .isLength({ max: 100 })
            .withMessage("Title is required")
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ error: error });
        }
        try {
            const { id } = req.params;
            const { title, description, isComplete } = req.body;
            const updatedTask = await Todo.findByIdAndUpdate(
                { _id: id },
                { title, description, isComplete },
                { new: true }
            );
            if (!updatedTask) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

//delete task
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Todo.findByIdAndDelete({ _id: id });
        if (!deleteTask) {
            return res.status(404).json({ error: "task not found" });
        }
        return res.status(200).json({ success: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;