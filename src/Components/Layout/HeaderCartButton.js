import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import Classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/CartContext";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const [animation, setAnimation] = useState(false);

  const { items } = ctx;

  const numberOfCartItems = items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);
  const cartHandler = () => {
    props.cartHandler();
  };

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setAnimation(true);

    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClass = `${Classes.button} ${animation ? Classes.bump : ""}`;
  return (
    <button className={btnClass} onClick={cartHandler}>
      <span className={Classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={Classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
