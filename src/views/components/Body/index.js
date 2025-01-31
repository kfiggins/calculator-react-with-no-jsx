import React from "react";
import { Display, Row } from "./components";
import { calculatorButtons } from "./configs";

const Body = () => {
  return React.createElement(
    "div",
    {
      style: {
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "24px",
        maxWidth: "400px",
      },
    },
    React.createElement(Display, { value: 50012 }),
    calculatorButtons.map((row) => React.createElement(Row, { buttons: row })),
  );
};

export default Body;
