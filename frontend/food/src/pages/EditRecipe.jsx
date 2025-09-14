import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response => {
                console.log("response",response)
                let res = response.data;
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time
                })
            })
        } 
        getData()
    },[])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients")? e.target.value.split(","): (e.target.name == "coverImage")? e.target.files[0] : e.target.value;

        setRecipeData(pre=>({...pre,[e.target.name]:val}));
    }
    const submitHandle = async (e) => {
        e.preventDefault();
        console.log(recipeData)
        await axios.put(`http://localhost:5000/recipe/${id}`,recipeData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization":'bearer '+ localStorage.getItem("token")
            }
        })
        .then(()=>navigate("/"))
    }
  return (
    <form className="container mt-4" onSubmit={submitHandle}>
      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Enter recipe title"
          required
          onChange={onHandleChange}
          value={recipeData.title}
        />
      </div>

      {/* Ingredients */}
      <div className="mb-3">
        <label className="form-label">Ingredients</label>
        <textarea
          className="form-control"
          name="ingredients"
          rows="3"
          placeholder="Enter ingredients"
          required
          onChange={onHandleChange}
          value={recipeData.ingredients}
        ></textarea>
      </div>

      {/* Instructions */}
      <div className="mb-3">
        <label className="form-label">Instructions</label>
        <textarea
          className="form-control"
          name="instructions"
          rows="4"
          placeholder="Enter instructions"
          required
          onChange={onHandleChange}
          value={recipeData.instructions}
        ></textarea>
      </div>

      {/* Time */}
      <div className="mb-3">
        <label className="form-label">Time</label>
        <input
          type="text"
          className="form-control"
          name="time"
          placeholder="e.g. 30 mins"
          onChange={onHandleChange}
          value={recipeData.time}
        />
      </div>

      {/* Cover Image */}
      <div className="mb-3">
        <label className="form-label">Cover Image</label>
        <input
          type="file"
          className="form-control"
          name="coverImage"
          accept="image/*"
          onChange={onHandleChange}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary">
        Edit
      </button>
    </form>
  )
}
