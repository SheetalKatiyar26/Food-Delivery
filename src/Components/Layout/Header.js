import React from "react";
import Classes from "./Header.module.css";
import foodImage from "../../Assets/platter-gac89b95a4_1920.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={Classes.header}>
        <h1>Moksh</h1>
        <HeaderCartButton cartHandler={props.cartHandler} />
      </header>
      <div className={Classes.mainImage}>
        <img src={foodImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
