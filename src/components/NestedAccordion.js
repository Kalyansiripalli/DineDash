import { useState } from "react";
import AccordionOfMenuCategories from "./AcoordionOfMenuCategories";

const NestedAccordion = ({ nestedItems }) => {
  console.log(nestedItems);

  const [displayDishes] = useState(true);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  return (
    <div>
      <h1 className="font-extrabold py-4">{nestedItems.title}</h1>
      {nestedItems.categories.map((c, ind) => (
        <AccordionOfMenuCategories
          key={c.title}
          details={c}
          displayDishes={ind === activeAccordionIndex ? displayDishes : false}
          index={ind}
          activeAccordionIndex={activeAccordionIndex}
          setActiveAccordionIndex={setActiveAccordionIndex}
        />
      ))}
    </div>
  );
};

export default NestedAccordion;
