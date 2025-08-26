import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();



router.route('/create').post(protectedRoute,createTodo);
router.route('/').get(getAllTodos);
router.route('/:todoId').put(protectedRoute,updateTodo).delete(protectedRoute,deleteTodo);



export default router;