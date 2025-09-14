import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'
import LoginModal from './LoginModal';
import InputForm from './InputForm';

export default function Navbar() {
  const [isOpen,setisOpen] = useState(false)
  let token = localStorage.getItem("token")
  console.log("token",token)
  const [isLogin,setIsLogin] = useState(token?false:true);
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    setIsLogin(token?false:true);
  },[token])

  const CheckLogin=()=>{
    if(token){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setisOpen(true);
    }
    else{
      setisOpen(true);
    }
  }
  const checkIsLogin = () =>{
    if(isLogin){
      setisOpen(true)
    } 
    
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom-green sticky-top">
      <div className="container">
        <NavLink className="navbar-brand logo-name" to="/">Food Recipes</NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item" onClick={checkIsLogin}>
              <NavLink className="nav-link" to={!isLogin ? "/my-recipes": "/"}>My Recipe</NavLink>
            </li>
            <li className="nav-item" onClick={checkIsLogin}>
              <NavLink className="nav-link" to={!isLogin ? "/favourites": "/"}>Favourites</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={CheckLogin}>{isLogin ? "Login":"Logout"}{user?.email ? `(${user.email})` : ''}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      {<LoginModal title="Login" show={isOpen} onClose={()=>{setisOpen(false)}}><InputForm setIsOpen={()=>setisOpen(false)} /></LoginModal>}
    </>
  );
}