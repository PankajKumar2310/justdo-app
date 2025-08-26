import { toast } from "sonner";
import { Button } from "../components/ui/button";
import React, { use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate =useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // optional: redirect to login
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center p-5 shadow m-5 rounded-2xl bg-white">
      <h1 className="font-serif font-bold text-2xl">Todo App</h1>
      <Button
        onClick={logoutHandler}
        className="bg-red-500 hover:bg-red-600 text-lg text-white rounded-2xl cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
