import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AllTodo from './allTodo';
import Login from './Login';
import { toast } from 'sonner';
import axios from "axios";


function Dashboard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [refreshKey, setRefreshKey] = useState(0); // Add this to trigger refetch

    const handleTitle = (e) => {
        setTitle(e.target.value)
        console.log(e.target.value);
    }

    const addTodoHandler = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/v1/todo/create",
            { title, description },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
    
          if (res.data.success) { 
            toast.success(res.data.message);
            setDescription("")
            setTitle("")
            // Trigger refetch by updating the key
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
        <div className="flex flex-col items-center p-4">
            {/* Input + Button row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
                <Input
                    className="flex-1 w-full"
                    value={title}
                    type="text"
                    placeholder="Add a New Note here"
                    onChange={handleTitle}

                />
                <Button onClick={addTodoHandler} className="w-full sm:w-auto bg-black text-white cursor-pointer">
                    Add Todo
                </Button>
            </div>

            {/* Textarea for description */}
            <Textarea
                placeholder="Write description here..."
                rows={8}
                className="w-full max-w-2xl mt-6 border border-gray-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <AllTodo key={refreshKey} />
        </div> 
    );
}

export default Dashboard;
