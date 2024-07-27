import MenuDishCard from "./MenuDishCard";

const AccordionOfMenuCategories = (props) => {
  const { title, itemCards } = props.details;
  const setActiveAccordionIndex = props.setActiveAccordionIndex;
  const displayDishes = props.displayDishes;
  const index = props.index;
  const activeAccordionIndex = props.activeAccordionIndex;
  return (
    <>
      <div className="py-6 cursor-pointer">
        <div
          className="flex justify-between hover:bg-gray-100 hover:shadow-sm cursor-pointer p-2 rounded"
          onClick={() => {
            if (activeAccordionIndex === index) {
              setActiveAccordionIndex(null);
            } else {
              setActiveAccordionIndex(index);
            }
          }}
        >
          <span className="font-bold">{`${title} (${itemCards.length})`}</span>
          <span className="font-extrabold">
            {props.displayDishes ? "▾" : "▸"}
          </span>
        </div>

        {displayDishes &&
          itemCards.map((dish, ind) => (
            <div key={dish.card.info.id} className="py-2">
              <MenuDishCard dishInfo={dish.card.info} />
              <hr className="bg-gray-300" />
            </div>
          ))}
      </div>
      <hr className="bg-gray-300" />
    </>
  );
};

export default AccordionOfMenuCategories;
