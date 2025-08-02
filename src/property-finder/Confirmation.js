import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Proptype.css'

export default function Confirmation() {
  return (
    <>
    <div className="buttons-container">

      <center><h1>Select type of property</h1></center>
      <button className="confirmButton"><Link to="/sellhouse" id='btn-lks'>House</Link></button>
      <br />
      <button className="confirmButton"  ><Link to='/sellapartment' id='btn-lks'>Apartment</Link></button>
      <br />
      <button className="confirmButton"><Link to="/sellland" id='btn-lks'>Land</Link></button>
      <br />
      
    </div>
  </>
  )
}
