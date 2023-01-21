import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from './context/AuthContext'

const root = document.getElementById("root");
render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
    root);
