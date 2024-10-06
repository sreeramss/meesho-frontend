import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests
import { toast } from "react-toastify";
import img1 from "../assets/loginimg.webp";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle signup navigation
  const handleSignUpNavigation = () => {
    navigate("/signUp");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to backend API for login
      const response = await axios.post("https://meesho-backend-xefg.onrender.com/api/user/login", {
        email,
        password,
      });
      // If login is successful, save token to localStorage
      localStorage.setItem("authToken", response.data.token);
      Cookies.set('authToken',response.data.token,{expires:7,path:'/'})
      // Redirect to homepage or desired route
      navigate("/");
      navigate(0)

      // Display success message
      toast.success("Welcome Back!", {
        autoClose: 3000,
        hideProgressBar: true,
        className: "bg-green-600 text-white font-semibold",
      });
    } catch (error) {
      // Display error message if login fails
      toast.error("Invalid credentials. Please try again.", {
        autoClose: 3000,
        hideProgressBar: true,
        className: "bg-red-500 text-white font-semibold",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fdefe9] min-h-screen flex items-center"
    >
      <div className=" bg-white mt-32 rounded-xl h-auto mb-20 w-[400px] mx-auto">
        <img src={img1} className=" rounded-t-xl" alt="" />
        <div className="p-8">
          <p className="text-xl font-extrabold">Login to view your profile</p>
          <input
            className="outline-none mt-4 w-full p-1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            className="outline-none mt-4 w-full p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="mt-4 bg-[#9f2089] rounded-md text-lg font-bold text-white p-2 w-[100%]">
            Log In
          </button>
          <p className="mt-4 text-center text-[15px]">
            Don't have an account?{" "}
            <span
              onClick={handleSignUpNavigation}
              className="text-[#9f2089] cursor-pointer"
            >
              Sign Up
            </span>
          </p>
          <p className="font-bold text-center text-[12px] mt-14">
            <span className="opacity-70">
              By continuing, you agree to Meesho's
            </span>
            <br />
            <span className="text-[#9f2089]">
              Terms & Conditions and Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
