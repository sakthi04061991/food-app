import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import foodimg from '../assets/food-receipe.jpg';
import { IoIosStopwatch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';


export default function RecipeItems() {
  const allRecipes = useLoaderData();
  const [recipesAll, setRecipesAll] = useState();
  const navigate = useNavigate();
  let path = window.location.pathname === "/my-recipes" ? true : false;
  let facIcon = JSON.parse(localStorage.getItem('fav')) ?? [];
  const [isFav, setIsFav] = useState(false)
  useEffect(()=>{
    setRecipesAll(allRecipes)
  },[allRecipes])

  const deleteHandler = async (id) => {
    console.log("did",id)
    await axios.delete(`http://localhost:5000/recipe/${id}`)
    .then((res) => console.log(res))
    setRecipesAll(allRecipes=>allRecipes.filter(rec=>rec._id !== id))
  }

  const favIcon = async (item) =>{
    let filterItem = facIcon.filter(rec=>rec._id !== item._id);
    facIcon = facIcon.filter(rec=>rec._id==item._id).length === 0 ? [...facIcon,item] : filterItem;
    localStorage.setItem("fav",JSON.stringify(facIcon));
    setIsFav(pre=>!pre)
    console.log(window.location.pathname)
    if(window.location.pathname == "/favourites"){
      setRecipesAll(JSON.parse(localStorage.getItem("fav")))
      if(facIcon.length === 0){
        navigate("/")
      }
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {recipesAll?.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 rounded">
              <img 
                src={`http://localhost:5000/images/${item.coverImage}`}
                className="img-thumbnail" 
                alt={item.title} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="text-muted"><IoIosStopwatch /> {item.time || '10 min'}</div>
                  {path? <div className='action'><Link to={`/edit-recipe/${item._id}`} className='editIcon'><FaEdit /></Link> <MdDelete onClick={() => deleteHandler(item._id)} className='deleteIcon'/> </div>: <div className="text-danger">
                    <FaHeart onClick={()=>favIcon(item)} style={{color:(facIcon).some(res=>res._id===item._id) ? "red": "black"}}/>
                      </div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}