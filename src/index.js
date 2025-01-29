import React from "react";
import ReactDOM from "react-dom/client"; // Use `react-dom/client` in React 18+

const App = () =>
  React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello, React without JSX!"),
    React.createElement("p", null, "This is a basic setup."),
  );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
