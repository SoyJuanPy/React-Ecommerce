import React from "react";
import ReactDOM from "react-dom/client"; // Asegúrate de importar ReactDOM desde 'react-dom/client'
import "./App.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // Usa createRoot en lugar de render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

serviceWorker.unregister();
