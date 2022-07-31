import React from "react";
import ReactDOM from "react-dom";
import Classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={Classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={Classes.modal}>
      <div className={Classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const elementId = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, elementId)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        elementId
      )}
    </>
  );
};

export default Modal;
