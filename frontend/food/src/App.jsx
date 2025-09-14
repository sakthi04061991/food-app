import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import Mainnevigation from './components/Mainnevigation'
import ErrorPage from './pages/ErrorPage';
import axios from "axios"
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get("http://localhost:5000/recipe").then(res=>{
    allRecipes=res.data;
    console.log(allRecipes)
  })
  return allRecipes;
}

const getMyrecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter(item=>item.createdBy === user._id)
}

const getFav = () => {
  return JSON.parse(localStorage.getItem("fav"))
}

const router=createBrowserRouter([
  {path:"/",element:<Mainnevigation />, errorElement: <ErrorPage />, children:[
      {path:"/",element:<Home />,loader:getAllRecipes},
      {path:"/my-recipes",element:<Home />,loader:getMyrecipes},
      {path:"/favourites",element:<Home />,loader:getFav},
      {path:"/add-recipe",element:<AddRecipe />},
      {path:"/edit-recipe/:id",element:<EditRecipe />},
  ]}
])
export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
