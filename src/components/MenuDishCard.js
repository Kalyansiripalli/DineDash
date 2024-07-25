import React from "react";
import { CdnURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../utils/slices/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ratingImage from "../utils/ratingStar.png";


const MenuDishCard = (props) => {
  const { name, description, price, imageId, ratings } = props.dishInfo;
  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    dispatch(addItemsToCart(props.dishInfo));
  };

  const handleMinusButtonClick = () => {
    dispatch(removeItemFromCart(props.dishInfo));
  };

  const handlePlusButtonClick = () => {
    dispatch(addItemsToCart(props.dishInfo));
  };

  const orderDetails = useSelector((store) => store.cart.cartItems).filter(
    (item) => item.id === props.dishInfo.id
  );

  return (
    <div className="flex h-36 justify-between ">
      <div className="w-3/4 bg-white px-2 space-y-4">
        <p className="font-bold">{name}</p>
        <div className="flex flex-row align-middle">
          <span className="font-semibold">Rs-{price / 100} | </span>
          {ratings?.aggregatedRating?.rating ? (
            <span className="flex items-center mx-1">
              {`${ratings?.aggregatedRating?.rating}`}
              <img
                src={ratingImage}
                alt="rating-image"
                className="w-4 h-4 mx-1"
              />
            </span>
          ) : null}
          {ratings?.aggregatedRating?.rating ? (
            <span className="mx-1">{`(${ratings?.aggregatedRating?.ratingCountV2})`}</span>
          ) : null}
        </div>

        <p className="font-light py-1 truncate">{description}</p>
      </div>

      <div className="w-1/4 p-8 flex justify-center ">
        {orderDetails.length > 0 ? (
          <div className="absolute  my-16 bg-slate-50 border border-slate-200 rounded-xl shadow-xl text-lime-600 font-bold ">
            <div className="flex items-center space-x-2 bg-green-50 rounded-xl">
              <button
                className="w-8 h-8   hover:bg-slate-200 rounded-xl text-lime-600 font-bold text-2xl"
                onClick={handleMinusButtonClick}
              >
                -
              </button>

              <div>{orderDetails[0].OrderQuantity}</div>

              <button
                className="w-8 h-8  hover:bg-slate-200 rounded-xl text-lime-600 font-bold text-2xl"
                onClick={handlePlusButtonClick}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button
            className="shadow-xl rounded-xl absolute px-8 py-2 mx-11 my-16 border border-slate-200 text-lime-600 bg-green-50 font-bold"
            onClick={handleAddButtonClick}
          >
            ADD TO <ShoppingCartOutlined />
          </button>
        )}

        {imageId ? (
          <img
            src={`${CdnURL}/${imageId}`}
            alt="dish-image"
            className="w-full h-full"
          />
        ) : null}
      </div>
    </div>
  );
};

export default MenuDishCard;
