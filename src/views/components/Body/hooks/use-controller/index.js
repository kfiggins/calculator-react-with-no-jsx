import React from "react";
const initialMemory = { operation: "", value: 0 };

export default () => {
  const [memory, setMemory] = React.useState(initialMemory);
  const [display, setDisplay] = React.useState("0");
  const [activeOperation, setActiveOperation] = React.useState("");

  const click = (value) => {
    const parsedValue = parseClickValue(value);

    // NUMBER FLOW *****
    if (parsedValue.type === "number") {
      if (!isValidNumber({ display, parsedValue })) return;

      let nextDisplay = display;
      if (activeOperation) {
        setDisplay("");
        setActiveOperation("");
        nextDisplay = "";
      }

      nextDisplay = getNextDisplay({ display: nextDisplay, parsedValue });
      setDisplay(nextDisplay);

      // OPERATION FLOW *****
    } else {
      if (parsedValue.value === "AC") {
        setMemory(0);
        setDisplay("0");
        return;
      }

      if (parsedValue.value === "=") {
        const cleanDisplay = Number(cleanOutCommas(display));
        if (cleanDisplay > 0 && memory.operation) {
          const final = operationMap[memory.operation](
            cleanDisplay,
            memory.value,
          );

          setDisplay(final);
          setMemory(initialMemory);
          setActiveOperation("=");
        }
      }

      if (["/", "x", "-", "+"].includes(parsedValue.value)) {
        setMemory({
          operation: parsedValue.value,
          value: Number(cleanOutCommas(display)),
        });
        setActiveOperation(parsedValue.value);
      }
    }
  };

  return { handlers: { click }, state: { display } };
};

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

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

const operationMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
};
