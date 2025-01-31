import React from "react";
import { Body, Title } from "./components";

const Calculator = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(Title),
    React.createElement(Body),
  );
};

export default Calculator;
