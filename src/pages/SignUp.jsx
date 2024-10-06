import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests
import { toast } from "react-toastify";
import img1 from "../assets/loginimg.webp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  // Handle navigation to login page
  const handleLoginNavigation = () => {
    navigate("/login");
  };

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to backend API for user registration
      const response = await axios.post("https://meesho-backend-xefg.onrender.com/api/user/signup", {
        name,
        email,
        password,
      });

      // If signup is successful, redirect to login page
      navigate("/login");

      // Show success toast notification
      toast.success("Signup Successful", {
        autoClose: 2000,
        hideProgressBar: true,
        className: "bg-green-600 text-white font-semibold",
      });
    } catch (error) {
      // Show error toast notification if signup fails
      toast.error("Signup failed. Please try again.", {
        autoClose: 2000,
        hideProgressBar: true,
        className: "bg-red-600 text-white font-semibold",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fdefe9] min-h-screen flex items-center"
    >
      <div className="bg-white mt-32 rounded-xl h-auto mb-20 w-[400px] mx-auto">
        <img src={img1} className="rounded-t-xl" alt="Signup" />
        <div className="p-8">
          <p className="text-xl font-bold">Sign Up to create your profile</p>
          <input
            className="outline-none mt-4 w-full p-1"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
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
            Continue
          </button>
          <p className="mt-4 text-center text-[15px]">
            Already have an account?{" "}
            <span
              onClick={handleLoginNavigation}
              className="text-[#9f2089] cursor-pointer"
            >
              Login
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

export default SignUp;
