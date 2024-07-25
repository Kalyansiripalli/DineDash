import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResturantCard from "./ResturantCard";
import { BaseURL } from "../utils/constants";
import { useSelector } from "react-redux";
import ResturantGridListing from "./ResturantGridListing";

const CategoryResturants = () => {
  const [resturantCategorydata, setResturantCategorydata] = useState(null);
  const { collectionId, searchContext } = useParams();
  const latitude=useSelector((store)=>store.location.lat)
  const longitude=useSelector((store)=>store.location.lng)
  useEffect(() => {
    fetchAllResturantsOfCategory();
  }, [latitude,longitude]);
  const resturants = resturantCategorydata?.cards.filter(
    (card) =>
      card.card.card["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  ).map((resturant)=>resturant.card.card);
  console.log(resturants);
  const fetchAllResturantsOfCategory = async () => {
    try {
      // const res = await fetch(
      //   `${BaseURL}lat=${latitude}&lng=${longitude}&collection=${collectionId}&tags=layout_CCS_${searchContext}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      // );
      const res = await fetch(
        `https://dine-dash-server-ten.vercel.app/api/categoryPage?lat=${latitude}&lng=${longitude}&collectionId=${collectionId}&searchContext=${searchContext}`
      );
      const json = await res.json();
      setResturantCategorydata(json.data);
    } catch (error) {
      console.log("Un-known Error");
    }
  };
  return resturantCategorydata ? (
    <>
      <div className="px-48">
        <p className="font-semibold text-6xl my-4">{resturantCategorydata?.cards[0]?.card?.card?.title}</p>
        <p className=" text-md text-gray-600 my-4">{resturantCategorydata?.cards[0]?.card?.card?.description}</p>
        <hr />
        <p className="font-bold text-xl my-6">Top Restaurant Chains</p>
        
        <ResturantGridListing filteredList={resturants}/>
        
      </div>
    </>
  ) : (
    <></>
  );
};

export default CategoryResturants;
