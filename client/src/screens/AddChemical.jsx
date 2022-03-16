import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/AddChemical.scss";

const AddChemical = ({history, addChemical}) => {

  const {token, id} = JSON.parse(localStorage.getItem("user_info"))


    const [chemicalData, setChemicalData] = useState({
        chemicalName: "",
        chemicalQuantity: ""
    })



const {chemicalName, chemicalQuantity} = chemicalData;

  


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/chemicals", {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
              "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              chemicalName,
              chemicalQuantity,
              user: id
            })
          })
            .then(res => res.json())
            .then(data => {
                addChemical(data.data)
               history.push("/dashboard")
           
         })
            .catch(err => console.log(err))


        setChemicalData({
            chemicalName: "",
            chemicalQuantity: ""
        })
    }

    




    const handleChange = (e) => {
       
        setChemicalData({ ...chemicalData, [e.target.name]: e.target.value })
    }


  return (
    <div className="add-chem-container">
      <h2>Add Chemical</h2>
      <Form onSubmit={handleSubmit} className="add-chem-form">

        <Form.Group className="mb-3 " controlId="">
          <Form.Label>Chemical Name: </Form.Label>
          <Form.Control onChange={handleChange} name='chemicalName' value={chemicalName} type="text" placeholder="Enter chemical name.." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Chemical Quantity</Form.Label>
          <Form.Control onChange={handleChange}  name='chemicalQuantity' value={chemicalQuantity} type="number" placeholder="Enter chemical quantity" />
        </Form.Group>



        <Button className="add-chem-button" variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddChemical;
