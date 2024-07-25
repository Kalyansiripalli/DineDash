import React, { useRef } from "react";
import { CdnURL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const WhatsOnYourMind = ({ categories }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };

  const navigate = useNavigate();
  const handleClick = (category) => {
    const link = category?.action?.link;
    const urlParams = new URLSearchParams(link.split("?")[1]);
    const collectionId = urlParams.get("collection_id");
    const searchContext = category?.action?.link?.match(/tags=([^&]*)/)[1];
    navigate(`/category/view/${collectionId}/${searchContext}`);
  };

  return (
    <div>
      <p className="text-3xl font-bold py-6">What's on your mind?</p>
      <div className="py-4 relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white font-extrabold p-4 rounded-full shadow-lg hover:bg-slate-500 transition duration-300"
        >
          &lt;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar space-x-5 px-5"
        >
          {categories ? (
            categories.map((category) => (
              <img
                key={category.imageId}
                src={`${CdnURL}/${category.imageId}`}
                alt={category.name}
                className="w-30 h-40  cursor-pointer hover:opacity-75 transition duration-300"
                onClick={() => handleClick(category)}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   bg-black text-white font-extrabold p-4 rounded-full shadow-lg hover:bg-slate-500 transition duration-300"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default WhatsOnYourMind;
