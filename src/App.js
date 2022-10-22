import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { LogIn } from "./pages";
import { Dashboard } from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LogIn />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])

export function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
    </>
  );
}