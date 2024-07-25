import { Link } from "react-router-dom";

const Grocery = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" text-center">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/coming-soon-9773380-7973903.png?f=webp"
          alt=""
          className="mx-auto mb-4 w-64"
        />
        <p className="my-8 font-medium">Great things take time 😁</p>

        <Link to="/">
          <input
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-auto"
            type="button"
            value="PROCEED TO DineDash"
          />
        </Link>
      </div>
    </div>
  );
};

export default Grocery;
