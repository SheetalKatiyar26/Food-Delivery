import React, { useContext } from "react";
import CartContext from "../../../Store/CartContext";

import Classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = "₹ " + props.price.toFixed(2);

  const addtoCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={Classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={Classes.description}>{props.description}</div>
        <div className={Classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addToCart={addtoCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
