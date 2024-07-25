import React from "react";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { clearCartItems } from "../utils/slices/cartSlice";
import { useDispatch } from "react-redux";
import orderConfirm from "../utils/order-confirmation.jpg"
const OrderConfirmationModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const clearCartClick = () => {
    dispatch(clearCartItems());
  };
  return (
    <>
      <input
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-4"
        type="button"
        value="PROCEED TO CHECKOUT"
        onClick={showLoading}
      />
      {/* <Button type="primary" onClick={showLoading}>
        Open Modal
      </Button> */}
      <Modal
        title={<p>Order Confirmed</p>}
        footer={
          <Link to="/">
            <Button type="primary" onClick={()=>{
            setOpen(false)
            clearCartClick()
            }}>
            Okay👍🏻
          </Button>
          </Link>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <img src={orderConfirm} alt="" />
        <div className="flex flex-col items-center">
        <p className="font-semibold text-orange-500 text-lg">Thanks for ordering on DineDash! 🎉</p>
        <p className=" font-semibold text-orange-500 text-md">Kick back and enjoy—your delicious meal is on its way! 🍽️😎</p>
        </div>
        
      </Modal>
    </>
  );
};
export default OrderConfirmationModal;
