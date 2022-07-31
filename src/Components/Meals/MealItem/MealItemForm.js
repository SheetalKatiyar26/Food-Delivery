import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = amountInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (enteredQuantity.trim().length === 0 || enteredQuantityNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    props.addToCart(enteredQuantityNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          // id: "quantity_" + props.id,
          id: `quantity_${props.id}`,
          type: "number",
          min: "1",
          max: "4",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button className={classes.btn}>+Add</button>
      {!amountIsValid && <p>Please enter a valid quantity (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
