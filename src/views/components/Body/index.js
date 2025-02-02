import React from "react";
import { Display, Row } from "./components";
import { calculatorButtons } from "./configs";
import { useController } from "./hooks";

const Body = () => {
  const { handlers, state } = useController();
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
    React.createElement(Display, { value: state.display }),
    calculatorButtons.map((row) =>
      React.createElement(Row, { buttons: row, onClick: handlers.click }),
    ),
  );
};

export default Body;
