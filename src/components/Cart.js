import { useDispatch, useSelector } from "react-redux";
import { CdnURL } from "../utils/constants";
import {
  addItemsToCart,
  clearCartItems,
  removeItemFromCart,
} from "../utils/slices/cartSlice";
import { Link } from "react-router-dom";
import OrderConfirmationModal from "./OrderConfirmationModal";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const calculateCartValue = () => {
    let total = 0;
    cartItems.forEach((element) => {
      total += (element.price / 100) * element.OrderQuantity;
    });
    return total;
  };
  const dispatch = useDispatch();
  const handleDecrease = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleIncrease = (item) => {
    dispatch(addItemsToCart(item));
  };

  const clearCartClick = () => {
    dispatch(clearCartItems());
  };

  return cartItems.length ? (
    <div className=" bg-slate-200 p-20">
      <input
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-4 "
        type="button"
        value="CLEAR CART"
        onClick={() => clearCartClick()}
      />
      <div className="flex  justify-between bg-slate-200 m-4">
        <div className="w-3/5 flex-row bg-white p-6">
          {cartItems.map((item) => {
            const {
              id,
              name,
              description,
              price,
              imageId,
              ratings,
              OrderQuantity,
            } = item;
            return (
              <div className="flex h-36 justify-between" key={id}>
                <div className="w-3/4 bg-white px-2">
                  <p className="font-bold">{name}</p>
                  <span className="font-semibold">Rs-{price / 100}</span>
                  {ratings?.aggregatedRating?.rating ? (
                    <p>{`${ratings.aggregatedRating.rating}⭐ (${ratings.aggregatedRating.ratingCountV2})`}</p>
                  ) : null}
                  <p className="font-light py-1">{description}</p>
                </div>

                <div className="w-1/4 p-8 flex justify-center relative">
                  <div className="absolute my-16 bg-slate-50 border border-slate-200 rounded-xl shadow-xl text-lime-600 font-bold">
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 hover:bg-slate-200 rounded-xl text-lime-600 font-bold text-2xl"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <div>{OrderQuantity}</div>
                      <button
                        className="w-8 h-8 hover:bg-slate-200 rounded-xl text-lime-600 font-bold text-2xl"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>

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
          })}
        </div>

        <div className="w-1/4 bg-white p-6">
          <h1 className="font-extrabold">Billing Details</h1>
          <div className="py-4 flex justify-between">
            <p>Total Amount:</p>
            <span>₹ {calculateCartValue()}</span>
          </div>
          <div className="py-4 flex justify-between">
            <p>Delivery Charges</p>
            <p>FREE</p>
          </div>
          <div className="py-4 flex justify-between">
            <p>Platform Fee</p>
            <div className="flex">
              <h1>₹</h1>
              <h1 className="line-through text-gray-400 mr-1">20.00</h1>
              <h1>4</h1>
            </div>
          </div>
          <div className="py-4 flex justify-between">
            <p>GST & Restaurant Charges</p>
            <p>₹ 42</p>
          </div>

          <hr className="border-t-2 border-slate-950 my-4" />
          <div className="py-4 flex justify-between">
            <p>Final Amount</p>
            <span>₹ {calculateCartValue() + 4 + 42}</span>
          </div>
          <OrderConfirmationModal />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" text-center">
        <img
          src="https://i.pinimg.com/originals/81/c4/fc/81c4fc9a4c06cf57abf23606689f7426.jpg"
          alt=""
          className="mx-auto mb-4 w-64"
        />
        <p className="my-8">Looks like you havent made your choice yet .......</p>
        <Link to="/">
          <input
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-auto"
            type="button"
            value="PROCEED TO SHOPPING"
          />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
