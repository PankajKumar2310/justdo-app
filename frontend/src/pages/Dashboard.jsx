import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AllTodo from './allTodo';
import { toast } from 'sonner';
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";

function Dashboard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const addTodoHandler = async () => {
        if (!title.trim()) {
            toast.error("Please enter a task");
            return;
        }
        
        try {
          const res = await axios.post(
            `${API_BASE_URL}/api/v1/todo/create`,
            { title, description },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
    
          if (res.data.success) { 
            toast.success(res.data.message);
            setTitle("")
            setDescription("")
            setRefreshKey(prev => prev + 1);
          } else {
            toast(res.data.message || "Something went wrong");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Server Error"); 
        }
      };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto ">
                <div className="max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-center text-5xl font-medium text-gray-800 mb-8 font-roboto">
                        Todos
                    </h1>
                    
                    {/* Create Task Section */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 font-roboto">
                        Create <span className="font-normal">Task</span>
                    </h1>
                    
                    {/* Input and Add Button */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <Input
                            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                            value={title}
                            type="text"
                            placeholder="What needs to be done?"
                            onChange={handleTitle}
                            onKeyPress={(e) => e.key === 'Enter' && addTodoHandler()}
                        />
                        <Button 
                            onClick={addTodoHandler} 
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-roboto text-lg px-6 py-3 rounded border-0 transition-colors duration-200"
                        >
                            Add
                        </Button>
                    </div>

                    {/* Description Textarea */}
                    <Textarea
                        placeholder="Write description here..."
                        rows={4}
                        className="w-full mb-8 bg-white border border-gray-300 rounded-lg px-4 py-3 text-base resize-none"
                        value={description}
                        onChange={handleDescription}
                    />
                    
                    {/* My Tasks Section */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 font-roboto">
                        My <span className="font-normal">Tasks</span>
                    </h1>
                    
                    {/* Todo List */}
                    <AllTodo key={refreshKey} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
