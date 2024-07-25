import React, { useEffect, useRef, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import WhatsOnYourMind from "./WhatsOnYourMind";
import { useSelector } from "react-redux";
import servicesUnAvailable from "../utils/servicesUnAvailable.png";
import TopResturantChanis from "./TopResturantChanis";
import ResturantGridListing from "./ResturantGridListing";
import OfflinePage from "./OfflinePage";
import Shimmer from "./Shimmer";
const Body = () => {
  const [isLoading, setIsLoading] = useState(true);
  let infiniteScrollPayload = useRef({});
  const [servicesAvailability, setServicesAvailability] = useState(true);
  const [categories, setCategories] = useState(null);
  const [topResturants, setTopResturants] = useState([]);
  const [listOfResturantsFromAPI, setListOfResturantsFromAPI] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();

  const userLocation = useSelector((store) => store.location);
  const { lat, lng, cityName } = userLocation;

  useEffect(() => {
    fetchDataFromSwiggyApI();
  }, [lat, lng]);

  const postData = async () => {
    try {
      const url =
        "https://coder-food-server-imnaval.vercel.app/api/swiggy/update";

      const data = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infiniteScrollPayload.current),
      });

      const json = await data.json();
      infiniteScrollPayload.current.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo =
        json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
      if (json?.data?.cards) {
        setListOfResturantsFromAPI((prev) => [
          ...prev,
          ...json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants,
        ]);
        setFilteredList((prev) => [
          ...prev,
          ...json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants,
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        postData();
      }
    } catch (error) {}
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const fetchDataFromSwiggyApI = async () => {
    try {
      // const response = await fetch(
      //   `${BaseURL}lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      // );
      const response = await fetch(
        `https://dine-dash-server-ten.vercel.app/api/homePage?lat=${lat}&lng=${lng}`
      );
      const json = await response.json();

      if (json.data.cards[0].card.card.id === "swiggy_not_present") {
        setServicesAvailability(false);
      } else {
        setServicesAvailability(true);
        const whatsOnYourMindCards = json.data.cards.filter(
          (card) => card.card.card.id === "whats_on_your_mind"
        );
        const topBrandsForYouCards = json.data.cards.filter(
          (card) => card.card.card.id === "top_brands_for_you"
        );

        const restaurantGridListingCards = json.data.cards.filter(
          (card) => card.card.card.id === "restaurant_grid_listing"
        );

        const categories = whatsOnYourMindCards.length
          ? whatsOnYourMindCards[0]?.card?.card?.imageGridCards?.info
          : [];

        const topResturants = topBrandsForYouCards.length
          ? topBrandsForYouCards[0].card.card.gridElements.infoWithStyle
              .restaurants
          : [];

        const resturants = restaurantGridListingCards.length
          ? restaurantGridListingCards[0].card.card.gridElements.infoWithStyle
              .restaurants
          : [];

        setCategories(categories);
        setTopResturants(topResturants);
        setListOfResturantsFromAPI(resturants);
        setFilteredList(resturants);
        const newPayload = {
          lat: json.data.cards[json.data.cards.length - 1].card.card.lat,
          lng: json.data.cards[json.data.cards.length - 1].card.card.lng,
          nextOffset: json.data.pageOffset.nextOffset,
          widgetOffset: json.data.pageOffset.widgetOffset,
          filters: {},
          seoParams:
            json.data.cards[json.data.cards.length - 1].card.card.seoParams,
          page_type: "DESKTOP_WEB_LISTING",
          _csrf: json.csrfToken,
        };
        infiniteScrollPayload.current = newPayload;
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (onlineStatus === false) {
    return <OfflinePage />;
  }

  if (servicesAvailability === false) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className=" text-center">
          <img
            src={servicesUnAvailable}
            alt=""
            className="mx-auto mb-4 w-100"
          />
        </div>
      </div>
    );
  }

  return filteredList.length ? (
    <div className="px-44 ">
      {categories?.length > 0 ? (
        <WhatsOnYourMind categories={categories} />
      ) : (
        <></>
      )}

      <hr className="bg-gray-300" />

      {topResturants.length > 0 ? (
        <TopResturantChanis topResturants={topResturants} />
      ) : (
        <></>
      )}

      <hr className="bg-gray-500 " />

      {/* filters portion */}

      <div className="flex p-4 justify-around align-middle">
        <div className="flex justify-between ">
          <input
            className="w-64 px-4 py-2 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            type="text"
            value={searchText}
            placeholder="Search Restaurant"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-50 text-lime-600 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-4"
            type="button"
            onClick={() => {
              const newList = listOfResturantsFromAPI.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredList(newList);
            }}
          >
            search
          </button>
        </div>
        <input
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-orange-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none "
          type="button"
          value="Top Rated Resturants"
          onClick={() => {
            const newList = listOfResturantsFromAPI.filter(
              (resturant) => resturant.info.avgRating >= 4
            );
            setFilteredList(newList);
          }}
        />
      </div>

      {/* resturant cards portion */}

      <p className="text-2xl font-bold py-4">
        Restaurants with online food delivery in {cityName}
      </p>

      <ResturantGridListing
        filteredList={filteredList}
        cityName={cityName}
      />
      {
        isLoading &&infiniteScrollPayload.current.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo !==""&& <Shimmer />
      }
    </div>
  ) : (
    <Shimmer />
  );
};

export default Body;
