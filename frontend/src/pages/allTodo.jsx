import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; 
import { Pencil, Trash2 } from "lucide-react";

function AllTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/todo`, { withCredentials: true });

      if (res.data.success) {
        setTodos(res.data.todos);
        // toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch todos");
    }
  };

  // ✅ Delete handler
  const deleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/v1/todo/${todoId}`,{headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true,
    });
      if (res.data.success) {
        toast.success("Todo deleted successfully");
        
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  };

  // ✅ Edit handler (for now just a placeholder)
  const editTodo = (id) => {
    toast.info(`Edit functionality coming soon for Todo: ${id}`);
  };

  return (
    <div className="p-6  mx-auto flex gap-5 flex-wrap">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="p-5 ml-5 bg-white border border-gray-200 rounded-2xl shadow-md mb-4 flex justify-between items-center hover:shadow-lg transition-all duration-300"
          >
        <div className="mr-5 flex justify-center items-center">
            {/* Left: Title + Description */}
            <div className="ml-5">
              <h1 className="text-lg font-semibold text-gray-800">
                {todo.title}
              </h1>
              <p className="text-gray-600">{todo.description}</p>
            </div>

            {/* Right: Actions */}
            <div className="flex gap-4 ml-5">
              <Button
                onClick={() => editTodo(todo._id)}
                variant="outline"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <Pencil className="w-4 h-4" /> Edit
              </Button>

              <Button
                onClick={() => deleteTodo(todo._id)}
                variant="destructive"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </div>
        </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No todos found.</p>
      )}
    </div>
  );
}

export default AllTodo;
