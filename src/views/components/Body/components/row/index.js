import React from "react";
import { Button } from "./components";

const Row = ({ buttons }) => {
  return React.createElement(
    "div",
    {
      style: {
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    buttons.map((button) =>
      React.createElement(Button, { key: button, value: button }),
    ),
  );
};

export default Row;
