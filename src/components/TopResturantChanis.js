import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResturantCard from "./ResturantCard";

const TopResturantChains = ({ topResturants }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };

  const navigate = useNavigate();

  const handleClick = (topResturant) => {
    const resturantId=topResturant.info.id;
    navigate(`/resturant/menu/${resturantId}`);
  };

  return (
    <div className="relative py-6">
      <p className="text-3xl font-bold mb-4">Top Resturant Chains</p>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white font-extrabold p-4 rounded-full shadow-lg hover:bg-slate-500 transition duration-300"
      >
        &lt;
      </button>
      <div
        ref={scrollRef}
        className="flex flex-row overflow-x-scroll no-scrollbar px-5 space-x-4"
      >
        {topResturants ? (
          topResturants.map((topResturant) => (
            <div onClick={() => handleClick(topResturant)} key={topResturant.info.id}>
              <div className="">
                <ResturantCard
                  resData={topResturant.info}
                />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white font-extrabold p-4 rounded-full shadow-lg hover:bg-slate-500 transition duration-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default TopResturantChains;
