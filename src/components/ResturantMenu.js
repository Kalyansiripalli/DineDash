import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useFetchResturantMenu from "../utils/useFetchResturantMenu";
import AccordionOfMenuCategories from "./AcoordionOfMenuCategories";
import { useState } from "react";
import ratingImage from "../utils/ratingStar.png";
import NestedAccordion from "./NestedAccordion";

const ResturantMenu = () => {
  const [displayDishes] = useState(true);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const { resturantId } = useParams();
  const menu = useFetchResturantMenu(resturantId);
  if (!menu) return <Shimmer />;
  const { name, cuisines, locality, avgRating, totalRatingsString } =
    menu?.cards[2]?.card?.card?.info || {};

  const menuCategories =
    menu?.cards[4]?.groupedCard.cardGroupMap.REGULAR.cards.filter((c) => {
      return (
        c.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        c.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
      );
    });

  return (
    <div className="w-6/12 m-auto">
      <div className="flex justify-between  py-10 ">
        <div>
          <h3 className="font-bold">{name}</h3>
          <p>🍜 {cuisines?.join(", ")}</p>
          <p>📌 {locality}</p>
        </div>
        {avgRating ? (
          <div className="flex-col border py-2 px-3 shadow-xl rounded-lg w-30 justify-center ">
            <h4 className=" flex w-full items-center justify-center">
              {avgRating}
              <img
                src={ratingImage}
                alt="rating-image"
                className="w-4 h-4 mx-1"
              />
            </h4>
            <p>{`${totalRatingsString}`}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr size="2" color="#f0f0f0" />

      {menuCategories.map((item, ind) => {
        return item.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ? (
          <>
            <NestedAccordion nestedItems={item.card.card} />
            <div className="p-1 bg-gray-200"></div>
          </>
        ) : (
          <>
            <AccordionOfMenuCategories
              key={item.card.card.title}
              details={item.card.card}
              displayDishes={
                ind === activeAccordionIndex ? displayDishes : false
              }
              index={ind}
              activeAccordionIndex={activeAccordionIndex}
              setActiveAccordionIndex={setActiveAccordionIndex}
            />
            <div className="p-1 bg-gray-200"></div>
          </>
        );
      })}
    </div>
  );
};

export default ResturantMenu;
