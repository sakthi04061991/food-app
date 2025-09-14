import React, { useState } from "react";
import FoodRecipe from "../assets/Food-PNG-Isolated-Pic.png";
import Profile from "../assets/profile.jpg";
import RecipeItems from "../components/RecipeItems";
import { useNavigate } from "react-router-dom";
import LoginModal from '../components/LoginModal';
import InputForm from '../components/InputForm'

export default function Home() {
  const navigate = useNavigate()
  const [isOpen,setisOpen] = useState(false)
  const addRecipe = () => {
    let token = localStorage.getItem("token")
    if(token){
      navigate('/add-recipe')
    }
    else{
      setisOpen(true)
    }
  }
  return (
    <>
      <div className="container-fluid bg-light p-4">
        <div className="row align-items-center">
          <div className="container-fluid bg-light p-5">
            <div className="row align-items-center">
              {/* Left column: Image */}
              <div className="col-md-6 text-center">
                <img
                  src={FoodRecipe}
                  className="img-fluid"
                  width="60%"
                  alt="Food Recipe"
                />
              </div>

              {/* Right column: Text */}
              <div className="col-md-6 p-5 text-center text-md-start">
                <div className="p-4">
                  <h1 className="mb-3 custom-green">Food Recipe</h1>
                  <p className="mb-4 text-muted">
                    A collection of delicious, easy-to-make recipes for every
                    occasion. Explore step-by-step instructions, ingredients,
                    and cooking tips to bring out the chef in you!
                  </p>
                  <button onClick={addRecipe} className="btn custom-btn-green btn-lg me-3">
                    Share Your Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {<LoginModal title="Login" show={isOpen} onClose={()=>{setisOpen(false)}}><InputForm setIsOpen={()=>setisOpen(false)} /></LoginModal>}
        <div className="recipeItem">
          <RecipeItems />
        </div>
      </div>
    </>
  );
}
