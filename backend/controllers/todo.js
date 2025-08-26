import { Todo } from '../models/todo.js';

// ========== CREATE ==========
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const todo = await Todo.create({ title, description });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully.",
            todo,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ========== READ ALL ==========
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        console.log(todos);

        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully.",
            todos: todos.length === 0 ? [] : todos,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ========== UPDATE ==========
export const updateTodo = async (req, res) => {
    try {
        const  todoId  = req.params.todoId;
        const { title, description } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            todoId,
            { title, description },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully.",
            todo,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ========== DELETE ==========
export const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findByIdAndDelete(todoId);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
