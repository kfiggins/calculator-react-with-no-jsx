import React from "react";

const Display = ({ value }) => {
  return React.createElement(
    "div",
    {
      style: {
        backgroundColor: "#f0f0f0",
        border: "1px solid gray",
        borderRadius: "5px",
        fontSize: "48px",
        padding: "10px",
        textAlign: "right",
      },
    },
    value.toLocaleString(),
  );
};

export default Display;
