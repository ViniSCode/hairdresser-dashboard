import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}