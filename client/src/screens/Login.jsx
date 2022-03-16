import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/Login.scss";

const Login = ({handleLogin, history, fetchChemicals}) => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
              "Content-type": "Application/json"
            },
            body: JSON.stringify(loginData)
          })
            .then(res => res.json())
            .then(data => {
                console.log(data)
               if(data.token){
                   localStorage.setItem("user_info", JSON.stringify({
                       first_name: data.first_name,
                       token: data.token,
                       id: data._id
                   }))
                  handleLogin()
                  fetchChemicals(data.token)
                  history.push("/dashboard")
               }else{
                   alert(data)
            }
         })
            .catch(err => console.log(err))


        setLoginData({
            email: "",
            password: ""
        })
    }

    




    const handleChange = (e) => {
       
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

const {email, password} = loginData;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit} className="login-form">

        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleChange} name='email' value={email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handleChange}  name='password' value={password} type="password" placeholder="Password" />
        </Form.Group>



        <Button className="login-button" variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
