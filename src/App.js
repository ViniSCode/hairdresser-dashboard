import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { LogIn } from "./pages";
const router = createBrowserRouter([
  {
    path: '/',
    element: <LogIn />
  }
])

export function App() {
  return (
      <RouterProvider router={router} />
  );
}