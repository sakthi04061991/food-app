import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';

export default function InputForm({setIsOpen}) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false)
    const [error,setErrro] = useState("");
    const handlerOnSubmit = async (e) =>{
        e.preventDefault();
        let endPoint=(isSignUp) ? "SignUp": "login";
        await axios.post(`http://localhost:5000/${endPoint}`,{email,password})
        .then((res) => {
            localStorage.setItem("token",res.data.token)
            console.log("users",JSON.stringify(res.data.user))
            localStorage.setItem("user",JSON.stringify(res.data.user))
            setIsOpen()
        })
        .catch(data=>setErrro(data.response?.data?.error))
    }
  return (
    <Form onSubmit={handlerOnSubmit}>
    {(error != '') && <h6 className="error">{error}</h6>}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password" onChange={(e)=>{setPassword(e.target.value)}}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="remember">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 custom-btn-green">
        {(isSignUp) ? "SignUp" : "Login"}
      </Button>
      <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Already have an account": "Create new account"}</p>
    </Form>
  );
}
