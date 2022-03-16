import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/Register.scss";

const Register = ({handleLogin, history, fetchChemicals}) => {

    const [registerData, setRegisterData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const [formError, setFormError] = useState({
        email: "",
        password: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/register", {
            method: "POST",
            headers: {
              "Content-type": "Application/json"
            },
            body: JSON.stringify(registerData)
          })
            .then(res => res.json())
            .then(data => {
               if(data.token){
                   localStorage.setItem("user_info", JSON.stringify({
                       first_name: data.first_name,
                       token: data.token,
                       id: data._id
                   }))
                   handleLogin();
                   fetchChemicals(data.token)
                  history.push("/dashboard")
               }else{
                  data.errors.map(error => {
                      alert(error.msg)
                  }) 
               }
            })
            .catch(err => console.log(err))


        setRegisterData({
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        })
    }

    




    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }


    const {first_name, last_name, email, password} = registerData

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit} className="register-form">

      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control value={first_name} onChange={handleChange} name="first_name" type="text" placeholder="First Name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={last_name} onChange={handleChange} name="last_name" type="text" placeholder="Last Name" />
        </Form.Group>


        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} onChange={handleChange} name="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={handleChange} name="password" type="password" placeholder="Password" />
        </Form.Group>



        <Button className="register-button" variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
