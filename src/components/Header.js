import React from "react";
import { AppLogo } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import LocationDrawer from "./LocationDrawer";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store?.cart?.cartItems);

  const calculateCartValue = () => {
    let total = 0;
    cartItems.forEach((element) => {
      total += (element.price / 100) * element.OrderQuantity;
    });
    return total;
  };

  return (
    <div className="flex justify-between px-8 py-2 shadow-md rounded-2xl">
      <Link to="/">
        <img className="w-16 h-16" src={AppLogo} alt="App Logo" />
      </Link>
      <LocationDrawer />
      <nav>
        <ul className="flex items-center h-16">
          <li className="px-4">
            {onlineStatus ? "Online Status: 🟢" : "Internet Connection 🔴"}
          </li>
          <Link to="/">
            <li className="px-4">Home</li>
          </Link>
          <Link to="/grocery">
            <li className="px-4">Grocery</li>
          </Link>
        </ul>
      </nav>
      <Link to="/cart">
        <div className="flex items-center bg-orange-500 px-6 py-2 rounded-xl text-white shadow-md font-bold">
          <ShoppingCartOutlined style={{ fontSize: "35px" }} />
          <div className="flex flex-col px-2">
            <p className="m-0 p-0">{cartItems.length} ITEMS</p>
            <span>₹ {calculateCartValue() ? calculateCartValue() + 46 : 0}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
