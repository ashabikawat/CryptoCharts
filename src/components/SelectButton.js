import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      style={{
        border: "1px solid #66fcf1",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "#66fcf1" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "#66fcf1",
          color: "black",
        },
        width: "22%",
        //   margin: 5,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectButton;
