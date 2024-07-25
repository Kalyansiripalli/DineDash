import React from "react";
import { Link } from "react-router-dom";
import ResturantCard, { WithTopRatedLabel } from "./ResturantCard";

const ResturantGridListing = ({ filteredList}) => {
  const TopRatedResturantCard = WithTopRatedLabel(ResturantCard);
  return (
    <div className="flex flex-wrap justify-between">
    {
      filteredList.map((restaurant) => {
        return (
          <Link
            to={`/resturant/menu/${restaurant?.info?.id}`}
            key={restaurant?.info?.id}
          >
            {restaurant?.info?.avgRating >= 4 ? (
              <TopRatedResturantCard
                key={restaurant?.info?.id}
                resData={restaurant?.info}
              />
            ) : (
              <ResturantCard
                key={restaurant?.info?.id}
                resData={restaurant?.info}
              />
            )}
          </Link>
        );
      })
    }
    </div>
  )
};

export default ResturantGridListing;
