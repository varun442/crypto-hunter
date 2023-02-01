import React from "react";
import "./SelectButton.css";
const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
      }}
      className="btn-styles"
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectButton;
