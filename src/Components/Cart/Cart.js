import React, { useContext, useState } from "react";
import Classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const addItemHandler = (item) => {
    cartCtx.addItem(item);
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const onSubmitHandler = async (userdata) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-delivery-app-cc3b4-default-rtdb.firebaseio.com//orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          users: userdata,
          orderitems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const CartItems = (
    <ul className={Classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const ModalActions = (
    <div className={Classes.actions}>
      <button className={Classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={Classes.button} onClick={orderHandler}>
          Order Now
        </button>
      )}
    </div>
  );

  const cartModal = (
    <>
      {CartItems}
      <div className={Classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={onSubmitHandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckout && ModalActions}
    </>
  );

  const isSubmittingContent = <p>Sending your order to the Restuarant...</p>;
  const didSubmitContent = (
    <>
      <p>Your order has been sent to the Restuarant.</p>
      <div className={Classes.actions}>
        <button className={Classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && isSubmittingContent}
      {didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
