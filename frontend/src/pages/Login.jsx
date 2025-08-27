import React, { use, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    
    const [user , setUser]= useState({
        email:"",
        password:""
    })

    const userhandler=(e)=>{
        setUser({...user,[e.target.name]: e.target.value})
    }

    const loginHandler = async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(`${API_BASE_URL}/api/v1/user/login`,user,{headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        
        })

         if(res.data.success){
            toast.success(res.data.message)
            setUser({email:"", password:""})
            navigate("/")
         }
            
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
        }
    }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          {/* Email */}
          <Input name="email" value={user.email} onChange={userhandler} type="email" placeholder="Email" required />

          {/* Password */}
          <Input name="password" value={user.password} onChange={userhandler} type="password" placeholder="Password" required />

          {/* Submit Button */}
          <Button onClick={loginHandler} cursor="pionter" className="w-full mt-2 cursor-pointer bg-amber-100 hover:bg-amber-400">Login</Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
     
    </div>
  );
}

export default Login;
