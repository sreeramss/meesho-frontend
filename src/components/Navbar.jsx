import React, { useEffect, useState } from "react";
import logo from "../assets/meeshoLogo.svg";
import { CiSearch } from "react-icons/ci";
import { TfiMobile } from "react-icons/tfi";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from 'jwt-decode' // import dependency
import Cookies from "js-cookie";



const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const categories = ["Mens", "Womens", "Jewellery", "Electronics"];

  // Fetching user data from the backend to show in the profile
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken")  
      const user = jwtDecode(token); // decode your token here         
      if (user) {
        const response = await axios.get(`https://meesho-backend-xefg.onrender.com/api/user/${user.id}`); // Adjust endpoint as per your backend
        setUserDetails(response.data)
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Logout functionality to handle the logout button
  const handleLogout = async () => {
    try {
      // Call backend API to handle logout (e.g., clearing session or token)
      await axios.post("https://meesho-backend-xefg.onrender.com/api/user/logout"); // Adjust endpoint as per your backend
      localStorage.removeItem("authToken");
      Cookies.remove('authToken', { path: '/' });
      navigate("/login");
      setUserDetails(null);
      toast.success("Logout Successful", {
        autoClose: 3000,
        hideProgressBar: true,
        className: "bg-green-600 text-white font-semibold",
      });
    } catch (error) {
      toast.error("Logout failed. Try again.", {
        autoClose: 3000,
        hideProgressBar: true,
        className: "bg-red-600 text-white font-semibold",
      });
    }
  };

  const toggleNavbar = () => {
    setVisible(!visible);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  // Filtering the search field to show suggestions
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.trim() !== "") {
      const filteredSuggestions = categories.filter((category) =>
        category.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Navigation to the category when clicking suggestions
  const handleSuggestionClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
    setSearchValue("");
    setSuggestions([]);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="fixed w-full top-0 z-40">
      {/* Main Navbar */}
      <div className="bg-white border-b">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center md:ml-16">
            {/* Logo */}
            <Link to="/">
              <img className="h-5 md:h-10" src={logo} alt="Meesho Logo" />
            </Link>

            {/* Search Bar */}
            <div className="flex ml-2 md:ml-8 border border-gray-300 rounded-full w-full md:w-[300px] p-2 relative">
              <CiSearch className="text-xl mt-[3px] text-gray-400" />
              <input
                className="w-full bg-transparent placeholder:text-[11px] placeholder:md:text-[12px] outline-none"
                placeholder="Try Men, Women, Jewellery, Electronics"
                type="text"
                value={searchValue}
                onChange={handleSearch}
              />
              {searchValue && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 bg-white border border-gray-300 rounded-md w-full mt-1 z-50">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center text-gray-700 text-sm gap-6 mr-6">
            <Link to="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow">
              <li className="flex items-center cursor-pointer p-2 border-r border-gray-300">
                <TfiMobile className="text-xl mr-2" />
                Download App
              </li>
            </Link>
            <Link to="https://supplier.meesho.com/?utm_source=meesho&utm_medium=website&utm_campaign=header">
              <li className="p-2 border-r cursor-pointer border-gray-300">
                Become a Supplier
              </li>
            </Link>
            <Link to="https://www.meesho.io/news">
              <li className="p-2 border-r cursor-pointer border-gray-300">
                Newsroom
              </li>
            </Link>

            <li onClick={toggleProfileDropdown} className="p-2 cursor-default">
              <GoPerson className="inline-block text-xl mb-1 cursor-pointer mr-2" />
              Profile
              {profileDropdown && (
                <div className="absolute z-50 right-10 mt-6 w-[260px] bg-white border border-gray-300 shadow-lg p-4">
                  <h2 className="text-lg pl-4 mt-2 font-bold">
                    Hello{" "}
                    {userDetails ? (
                      <span className="font-bold">{userDetails.name}</span>
                    ) : (
                      <>User</>
                    )}
                  </h2>
                  {userDetails ? (
                    <>
                      <h1 className="cursor-pointer border-t-2 mt-5 pt-4 font-semibold text-lg pl-4">
                        My orders
                      </h1>
                      <h1
                        onClick={handleLogout}
                        className="cursor-pointer border-t-2 mt-4 pt-4 font-semibold text-lg pl-4"
                      >
                        Log Out
                      </h1>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="bg-[#9f2089] text-white w-full p-2 text-lg font-extrabold rounded-md mt-4">
                          Log In
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="bg-[#9f2089] text-white w-full mb-4 p-2 text-lg font-extrabold rounded-md mt-4">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
            <Link to="/cart">
              <li className="p-2">
                <BsCart2 className="inline-block cursor-pointer text-xl mb-1 mr-2" />
                Cart
              </li>
            </Link>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden cursor-pointer mr-4">
            <button onClick={toggleNavbar} className="text-3xl">
              {visible ? <IoCloseOutline /> : <MdMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {visible && (
        <div className="lg:hidden bg-gray-50 p-4">
          <ul className="w-full text-center">
            <Link to="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow">
              <li className="flex items-center justify-center cursor-pointer w-full p-2 border-b border-gray-200">
                Download App
                <TfiMobile className="text-sm ml-2" />
              </li>
            </Link>

            <li className="w-full p-2 border-b cursor-pointer border-gray-200">
              Become a Supplier
            </li>
            <li className="w-full p-2 border-b cursor-pointer border-gray-200">
              Newsroom
            </li>
            <li
              onClick={toggleProfileDropdown}
              className="w-full p-2 flex justify-center cursor-pointer items-center relative"
            >
              Profile
              <GoPerson className="inline-block text-sm ml-2" />
              {profileDropdown && (
                <div className="absolute z-50 right-4 top-10 w-[260px] bg-white border border-gray-300 shadow-lg p-4">
                  <h2 className="text-lg pl-4 mt-2 font-bold">
                    Hello{" "}
                    {userDetails ? (
                      <span className="font-bold">{userDetails.name}</span>
                    ) : (
                      <>User</>
                    )}
                  </h2>
                  {userDetails ? (
                    <>
                      <h1 className="cursor-pointer border-t-2 mt-5 pt-4 font-semibold text-lg pl-4">
                        My orders
                      </h1>
                      <h1
                        onClick={handleLogout}
                        className="cursor-pointer border-t-2 mt-4 pt-4 font-semibold text-lg pl-4"
                      >
                        Log Out
                      </h1>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="bg-[#9f2089] text-white w-full p-2 text-lg font-extrabold rounded-md mt-4">
                          Log In
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="bg-[#9f2089] text-white w-full mb-4 p-2 text-lg font-extrabold rounded-md mt-4">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
            <Link to="/cart">
              <li className="w-full p-2 cursor-pointer">
                Cart
                <BsCart2 className="inline-block text-sm ml-2" />
              </li>
            </Link>
          </ul>
        </div>
      )}
      {/* Categories Navbar */}
      <div className="bg-white shadow-md fixed w-full z-40">
        <div className="flex justify-center">
          <ul className="flex gap-6 md:gap-20 text-sm lg:text-base font-semibold text-gray-600">
            <li className="cursor-pointer hover:text-[#9f2089] underline-animation py-2">
              <Link to="/mens">Men</Link>
            </li>
            <li className="cursor-pointer hover:text-[#9f2089] underline-animation py-2">
              <Link to="/womens">Women</Link>
            </li>
            <li className="cursor-pointer hover:text-[#9f2089] underline-animation py-2">
              <Link to="/jewellery">Jewellery</Link>
            </li>
            <li className="cursor-pointer hover:text-[#9f2089] underline-animation py-2">
              <Link to="/electronics">Electronics</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
