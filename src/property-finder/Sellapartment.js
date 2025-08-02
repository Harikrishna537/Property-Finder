import React, { useState } from 'react'
import '../css/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'

export default function Sellhouse() {
  const navigate=useNavigate()
    const [data,setData]=useState({
        year:"",
        area:"",
        roomstype:"",
        address:"",
        floors:"",
        parking:'',
        img1:"",
        img2:"",
        cost:""

    })

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    
      const { year,area,roomstype,address,floors,parking,img1,img2,cost } = data;
    
    const submitHandler=(e)=>{
      e.preventDefault()
      const token=localStorage.getItem('token')
      if(!token){
        alert("Please login before submitting details")
      navigate('/userlogin')
      }
      else{
        const submitApartment=async ()=>{
          const token=localStorage.getItem('token')
            const response=await axios.post("http://localhost:4000/sellapartment",{ year,area,roomstype,address,floors,parking,img1,img2,cost,token} )
            const responseData=response.data;
            if(responseData['response']==="1"){
              alert("Property added successfully")
        }
  
      }
      submitApartment();
      }

  }
  return (
<>
<div>
          <div className='logincontainer'>
    <center><h3 className='display-6'>Apartment Details</h3></center>
      <form onSubmit={submitHandler}>
  <div className="mb-3">
    <label  className="form-label">Year built</label>
    <input required type="number" className="form-control"  value={year} onChange={changeHandler} placeholder='Enter year of built' name='year'/>
    </div>
  <div className="mb-3">
    <label  className="form-label">Area(in sq.ft)</label>
    <input required type="number" className="form-control"  value={area} onChange={changeHandler} placeholder='Enter area of the house' name='area'/>
  </div>
  <div className="mb-3">
    <label  className="form-label">No.of floors</label>
    <input required type="number" className="form-control"  value={floors} name="floors" onChange={changeHandler} placeholder='Enter number of floors' />
  </div>
  <label  className="form-label">Type</label>
  <select className="form-select" aria-label="Default select example" value={roomstype} onChange={changeHandler} name='roomstype'>
  <option selected>Select rooms type</option>
  <option value="1bhk">1 BHK</option>
  <option value="2bhk">2 BHK</option>
  <option value="3bhk">3 BHK</option>
</select>
<div style={{marginTop:"10px"}}>
<label htmlFor="gender" className="form-label">
          Is parking space available?
        </label>
        <div className="form-check">
          <input
          required
            className="form-check-input"
            type="radio"
            name="parking"
            value="Yes"
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input required
            className="form-check-input"
            type="radio"
            name="parking"
            value="No"
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
        <div className="mb-3">
    <label  className="form-label">Images</label>
    <input required type="text" className="form-control"  value={img1} onChange={changeHandler} placeholder='Exterior image' name='img1'/><br/>
    <input required type="text" className="form-control"  value={img2} onChange={changeHandler} placeholder='Interior image' name='img2'/>
    </div>
    <div className="mb-3">
    <label  className="form-label">Cost of property</label>
    <input required type="number" className="form-control"  value={cost} onChange={changeHandler} placeholder='Enter cost you want to sell' name='cost'/>
    </div>
</div>
<div className="form-group" >
    <label for="exampleFormControlTextarea1">Address</label>
    <textarea placeholder='Enter apartment address' style={{marginTop:"10px"}} className="form-control" id="exampleFormControlTextarea1" rows="3" name='address' value={address} onChange={changeHandler}></textarea>
  </div>
  <center><button type="submit" className="btn btn-outline-danger my-4">Submit Details</button></center>
</form><br/>

</div>
    </div>
</>
  )
}
