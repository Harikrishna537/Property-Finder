import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Owner() {
    const nav=useNavigate()
    const [data,setData]=useState('')
    useEffect(()=>{
    const token=localStorage.getItem('token')
    if(!token){
        alert('Please login to view owner details')
        nav('/userlogin')
    }else{
    axios.post('http://localhost:4000/getownerdetails',{token}).then((resp)=>setData(resp.data.owner)).catch((err)=>console.log(err))
}})
  return (
    <>
    <div className='container my-5'>
    <center><h2>Owner details</h2></center>
    <div className='card' style={{width:"40%",margin:"10px auto"}}>
        <table style={{margin:"10px auto"}}>
            <tr>
                <td><strong>Name:</strong></td>
                <td>{data.name}</td>

            </tr>
            <tr>
                <td>
                    <strong>Email:</strong>

                </td>
                <td>
                    {data.email}
                </td>
                
            </tr>
            <tr>
                    <td><strong>Mobile:</strong></td>
                    <td>
                    {data.mobile}
                </td>
                </tr>
                <tr>
                    <td><strong>Gender:</strong></td>
                    <td>
                    {data.gender}
                </td>
                </tr>
        </table>
    </div>
    </div>
      </>      
  )
}
