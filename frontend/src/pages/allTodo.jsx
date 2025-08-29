import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";

function AllTodo() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/v1/todo`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/v1/todo/${todoId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Todo deleted successfully");
        fetchData();
        setCompletedTodos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(todoId);
          return newSet;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  };

  const toggleTodoStatus = (todoId) => {
    setCompletedTodos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(todoId)) {
        newSet.delete(todoId);
      } else {
        newSet.add(todoId);
      }
      return newSet;
    });
  };

  const editTodo = (todoId) => {
    toast.info(`Edit functionality coming soon for Todo: ${todoId}`);
  };

  return (
    <div className="space-y-4">
      {/* Show skeleton while loading */}
      {loading ? (
        <ul className="space-y-4">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="animate-pulse flex items-center justify-between bg-gray-100 border-l-4 border-gray-300 rounded-lg w-full p-3"
            >
              {/* Left side skeleton */}
              <div className="flex items-start flex-1">
                <div className="w-5 h-5 mr-3 mt-1 bg-gray-300 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              {/* Right side skeleton */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : todos.length > 0 ? (
        <ul className="space-y-4">
          {todos.map((todo) => {
            const isCompleted = completedTodos.has(todo._id);
            return (
              <li key={todo._id}>
                <div className="flex items-center justify-between bg-blue-50 border-l-4 border-blue-600 rounded-lg w-full p-3">
                  {/* Left Side: Checkbox + Content */}
                  <div className="flex items-start flex-1">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mr-3 mt-1"
                      checked={isCompleted}
                      onChange={() => toggleTodoStatus(todo._id)}
                    />
                    <div>
                      <label
                        className={`block font-roboto text-base font-normal ${
                          isCompleted
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </label>
                      {todo.description && (
                        <p className="mt-1 text-sm font-roboto text-gray-600">
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Right Side: Icons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => editTodo(todo._id)}
                      className="p-2 text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 " />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-8">No todos found.</p>
      )}
    </div>
  );
}

export default AllTodo;
