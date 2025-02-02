import React from "react";
import { Button } from "./components";

const Row = ({ buttons, onClick }) => {
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
      React.createElement(Button, { key: button, onClick, value: button }),
    ),
  );
};

export default Row;
