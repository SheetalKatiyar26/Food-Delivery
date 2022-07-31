import React, { useRef, useState } from "react";
import Classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pincodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPinCode = pincodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const validName = !isEmpty(enteredName);
    const validStreet = !isEmpty(enteredStreet);
    const validCity = !isEmpty(enteredCity);
    const validPinCode = isSixChars(enteredPinCode);

    setFormValidity({
      name: validName,
      street: validStreet,
      city: validCity,
      postalCode: validPinCode,
    });

    const formIsValid = validName && validStreet && validCity && validPinCode;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPinCode,
      city: enteredCity,
    });

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    pincodeInputRef.current.value = "";
    cityInputRef.current.value = "";
  };
  return (
    <div className={Classes.form}>
      <form onSubmit={onSubmitHandler}>
        <div className={Classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formValidity.name && (
            <p className={Classes.invalid}>Please enter valid name.</p>
          )}
        </div>
        <div className={Classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formValidity.street && (
            <p className={Classes.invalid}>Please enter valid street.</p>
          )}
        </div>
        <div className={Classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={pincodeInputRef} />
          {!formValidity.postalCode && (
            <p className={Classes.invalid}>Please enter valid postal code.</p>
          )}
        </div>
        <div className={Classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formValidity.city && (
            <p className={Classes.invalid}>Please enter valid city.</p>
          )}
        </div>
        <div className={Classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
