import { useState,React } from 'react'
import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import SetAvatar from './pages/SetAvatar';
import {createBrowserRouter,RouterProvider } from "react-router-dom"
import ChatContainer from './components/ChatContainer';
function App() {
  const routes = createBrowserRouter([
    {
      path:"/chatContainer",
      element:<ChatContainer/>
    },
    {
      path:"/setAvatar",
      element:<SetAvatar/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/",
      element:<Chat/>
    },
  ])
  return (
    <>
      <RouterProvider router={routes}>

      </RouterProvider>
    </>
  )
}

export default App
