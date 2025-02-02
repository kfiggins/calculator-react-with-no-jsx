import React from "react";

const Button = ({ onClick, value }) => {
  if (!value) {
    return React.createElement("div", {
      style: {
        height: "75px",
        margin: "5px",
        width: "75px",
      },
    });
  }

  return React.createElement(
    "button",
    {
      style: {
        backgroundColor: "#f0f0f0",
        border: "1px solid gray",
        borderRadius: "5px",
        fontSize: "24px",
        height: "75px",
        margin: "5px",
        width: "75px",
      },
      onClick: () => onClick(value),
    },
    value,
  );
};

export default Button;
