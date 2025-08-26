import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // handle input change
  const userHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // register handler
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setUser({ fullName: "", email: "", password: "" });
         // clear form
         navigate("/login")
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={registerHandler} className="space-y-4">
          <Input
            name="fullName"
            value={user.fullName}
            onChange={userHandler}
            type="text"
            placeholder="Full Name"
            required
          />
          <Input
            name="email"
            value={user.email}
            onChange={userHandler}
            type="email"
            placeholder="Email"
            required
          />
          <Input
            name="password"
            value={user.password}
            onChange={userHandler}
            type="password"
            placeholder="Password"
            required
          />
          <Button type="submit" className="w-full mt-2 cursor-pointer shadow bg-amber-200 hover:bg-amber-400">
            Register
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
        You already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
