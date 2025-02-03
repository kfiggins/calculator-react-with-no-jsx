import React from "react";
import { serializeInput } from "./seralizers";

const initialMemory = { operation: "", value: 0 };

export default () => {
  const [memory, setMemory] = React.useState(initialMemory);
  const [display, setDisplay] = React.useState("0");
  const [shouldResetDisplay, setShouldResetDisplay] = React.useState(false);

  const click = (rawValue) => {
    const { type, value } = serializeInput(rawValue);

    if (type === "number") {
      if (!isValidNumber({ display, value })) return;

      let nextDisplay = display;
      if (shouldResetDisplay) {
        setDisplay("");
        setShouldResetDisplay(false);
        nextDisplay = "";
      }

      nextDisplay = getNextDisplay({ display: nextDisplay, value });
      setDisplay(nextDisplay);
    } else {
      if (value === "AC") {
        setMemory(0);
        setDisplay("0");
        return;
      }

      if (value === "=") {
        const cleanDisplay = Number(cleanOutCommas(display));
        if (cleanDisplay > 0 && memory.operation) {
          const final = operationMap[memory.operation](
            memory.value,
            cleanDisplay,
          );

          setDisplay(addCommasToNumber(final));
          setMemory(initialMemory);
          setShouldResetDisplay(true);
        }
      }

      if (["/", "x", "-", "+"].includes(value)) {
        const cleanDisplay = Number(cleanOutCommas(display));
        if (cleanDisplay > 0 && memory.operation) {
          const final = operationMap[memory.operation](
            memory.value,
            cleanDisplay,
          );

          setDisplay(addCommasToNumber(final));
          setMemory({
            operation: value,
            value: final,
          });
        } else {
          setMemory({
            operation: value,
            value: Number(cleanOutCommas(display)),
          });
        }
        setShouldResetDisplay(true);
      }
    }
  };

  return {
    handlers: { click },
    state: { activeOperation: shouldResetDisplay, display, memory },
  };
};

const isValidNumber = ({ display, value }) => {
  if (value === ".") {
    if (display.includes(".")) return false;
  }
  return true;
};

const getNextDisplay = ({ display, value }) => {
  const combined = display + value;
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

const operationMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
};

// TODO's
// 1. Figure out how to keep display a number and format just for viewing.
// 2. Flash the display each time a button is pushed
// 3. add some animation to a button press
// 5. Remove commas after decimal
// 6. Cut off amount of decimal places.
