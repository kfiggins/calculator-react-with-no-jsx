import React from "react";
import ReactDOM from "react-dom/client"; // Use `react-dom/client` in React 18+
import Calculator from "./views/Calculator";

const App = () =>
  React.createElement("div", null, React.createElement(Calculator));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
