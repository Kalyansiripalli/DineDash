import { CdnURL } from "../utils/constants";
import ratingImage from "../utils/ratingStar.png";

const ResturantCard = (props) => {
  const { name, cloudinaryImageId, costForTwo, avgRating, sla, cuisines,areaName } = props.resData;
  return (
    <div className="w-64 h-72  flex flex-col rounded-lg cursor-pointer transform hover:scale-95 transition-transform duration-300 ">
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={`${CdnURL}${cloudinaryImageId}`}
        alt="Restaurant"
      />
      <div className="px-4">
          <h5 className="font-bold text-lg mb-1 text-gray-800 truncate">
            {name}
          </h5>
          <div className="flex flex-row items-center ">
            <img src={ratingImage} alt="rating-image" className="w-4 h-4" />
            <span className="font-semibold flex items-center mx-2 ">
              {avgRating}
            </span>
            <span className="font-bold"> | 🚴🏻‍♂️{sla.slaString}</span>
          </div>
          <p className="truncate text-gray-500 ">{cuisines.join(", ")}</p>

          <p className="text-gray-500">{areaName}</p>

        </div>
    </div>
  );
};

export const WithTopRatedLabel = (ResturantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-1 left-1 bg-slate-950 px-2 rounded-lg text-white transform hover:scale-95 transition-transform z-10">
          Top Rated 👑
        </label>
        <ResturantCard {...props} />
      </div>
    );
  };
};

export default ResturantCard;
