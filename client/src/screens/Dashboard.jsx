import React from 'react'
import { Button, Table } from 'react-bootstrap'
import '../styles/Dashboard.scss'

const Dashboard = ({chemicals, handleChemicalDelete, handleChemicalEdit }) => {


  if(chemicals && chemicals.length > 0){
    return (
      <div className='dashboard-container'>
       <h2>Dashboard</h2>
       <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>ID</th>
      <th>Chemical Name</th>
      <th>Chemical Quantity</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
      chemicals.map(({_id, chemicalName, chemicalQuantity }) => (
        <tr key={_id}>
        <td>{_id}</td>
        <td>{chemicalName}</td>
        <td>{chemicalQuantity}</td>
        <td> <Button onClick={() => handleChemicalDelete(_id)} variant="danger">Delete</Button></td>
        {/* <td> <Button onClick={() => handleChemicalEdit(_id)} variant="success">Edit</Button></td> */}
      </tr>
      ))
    }
   
  </tbody>
</Table>
      </div>
    )
  }else{
    return (
      <div className='dashboard-container'>
        <div className='spinner'>
         <p>No data available </p>
        </div>

      </div>
    )
  }
 
}

export default Dashboard