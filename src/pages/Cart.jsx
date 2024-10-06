import React, { useState, useEffect } from "react";
import axios from "axios"; // Use axios for API calls
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetching data to show the cart details from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://meesho-backend-xefg.onrender.com/api/cart", {
          withCredentials: true, // This ensures cookies are sent
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Error fetching cart items");
      }
    };

    fetchCartItems();
  }, []);

  // Remove function to delete the item from the cart using backend API
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://meesho-backend-xefg.onrender.com/api/cart/${productId}`, {
        withCredentials: true, // This ensures cookies are sent
      });

      setCartItems(cartItems.filter((item) => item.productId._id !== productId)); // Fix: Compare using productId._id
      toast.success("Removed from Cart", {
        autoClose: 3000,
        hideProgressBar: true,
        className: "bg-green-600 text-white font-semibold",
      });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        hideProgressBar: true,
        className: "bg-red-600 text-white font-semibold",
      });
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  // Calculate total number of products and total price
  const totalProducts = cartItems.length;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity, // Fix: Multiply by quantity
    0
  );

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 lg:px-16">
      {cartItems.length === 0 ? (
        <div className="text-center mt-40 md:mt-0">
          <h1 className="text-lg font-bold mt-[30px] md:mt-[250px]">Your cart is Empty</h1>
          <p className="text-[#9498b8] text-lg mt-4">
            Just relax, let us help you find some first-class products
          </p>
          <button
            onClick={handleNavigate}
            className="mt-8 p-3 text-lg px-12 rounded-md border bg-[#9f2089] text-white font-bold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="mt-[120px] md:flex justify-evenly max-w-screen-lg mx-auto">
          <div className="p-4 w-full">
            <h1>Product Details</h1>
            {/* Loop through cartItems */}
            {cartItems.map((item) => (
              <div className="flex border mt-2 rounded-md" key={item.productId._id}>
                <div className="mt-4 mb-4 p-2">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-24 h-24 "
                  />
                </div>
                <div className="p-3">
                  <div className="text-[13px]">{item.productId.title}</div>
                  <p className="mt-1">${item.productId.price}</p>
                  <p className="mt-1">All issue easy returns</p>
                  <p className="mt-1">
                    <span>Qty : {item.quantity}</span>
                    <button className="flex" onClick={() => handleRemove(item.productId._id)}>
                      <RxCross2 className="mt-1 mr-1" />
                      Remove
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Right Section */}
          <div className=" border h-[20%] mt-12 md:w-[50%] p-6">
            <div className="mb-2">
              <span>Price Details : </span>
              {totalProducts} Items
            </div>
            <div className="mb-2">
              <span>Total Price : </span>${totalPrice.toFixed(2)}
            </div>
            <button className="mt-4 w-full py-2 px-4 bg-[#9f2089] text-white rounded-md font-bold">
              Continue
            </button>
            <img
              src="https://images.meesho.com/images/marketing/1588578650850.webp"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
