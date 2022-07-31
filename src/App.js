import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartShownHandler = () => {
    setCartIsShown(true);
  };

  const cartHideHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      <Header cartHandler={cartShownHandler} />
      {cartIsShown && <Cart onCloseCart={cartHideHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
