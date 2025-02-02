import React from "react";

export default () => {
  const [memory, setMemory] = React.useState(0);
  const [display, setDisplay] = React.useState("0");
  const [activeOperation, setActiveOperation] = React.useState("");

  const click = (value) => {
    console.log(value);
    const parsedValue = parseClickValue(value);
    console.log(parsedValue);
    if (parsedValue.type === "number") {
      if (!isValidNumber({ display, parsedValue })) return;
      let nextDisplay = display;
      console.log("next", nextDisplay);
      if (activeOperation) {
        setDisplay("");
        setActiveOperation("");
        nextDisplay = "";
      }
      console.log("next", nextDisplay);
      nextDisplay = getNextDisplay({ display: nextDisplay, parsedValue });
      console.log("next", nextDisplay);
      setDisplay(nextDisplay);
    } else {
      if (parsedValue.value === "AC") {
        setMemory(0);
        setDisplay("0");
        return;
      }

      if (parsedValue.value === "+") {
        setMemory(Number(cleanOutCommas(display)));
        setActiveOperation(parsedValue.value);
      }
    }
  };

  return { handlers: { click }, state: { display } };
};

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operations = ["/", "x", "-", "+", "=", "AC"];

const parseClickValue = (value) => {
  const parsedValue = String(value);
  if (numbers.includes(parsedValue)) {
    return {
      type: "number",
      value: parsedValue,
    };
  } else {
    return {
      type: "operation",
      value: parsedValue,
    };
  }
};

const isValidNumber = ({ display, parsedValue }) => {
  if (parsedValue.value === ".") {
    if (display.includes(".")) return false;
  }
  return true;
};

const getNextDisplay = ({ display, parsedValue }) => {
  const combined = display + parsedValue.value;
  return addCommasToNumber(removeLeadingZero(combined));
};

const removeLeadingZero = (x) => {
  return x.replace(/^0+(?=\d)/, "");
};

const addCommasToNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const cleanOutCommas = (x) => {
  return x.replace(/,/g, "");
};
