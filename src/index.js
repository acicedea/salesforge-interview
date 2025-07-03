import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./utils/routes";
import "./index.css";
import process from "process";

window.process = process;

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
