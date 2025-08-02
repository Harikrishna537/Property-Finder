import React, { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './property-finder/Ulogin'
import Register from './property-finder/Userregister'
import Email from './property-finder/Email'
import Otp from './property-finder/Otp'
import Buyprop from './property-finder/Buyprop'
import Confirmation from './property-finder/Confirmation'
import Sellhouse from './property-finder/Sellhouse'
import Sellapartment from './property-finder/Sellapartment'
import Sellland from './property-finder/Sellland'
import Filterapartment from './property-finder/Filterapartment'
import Filterlands from './property-finder/Filterlands'
import Filterhouses from './property-finder/Filterhouses'
import Owner from './property-finder/Owner'
import Navbar from './property-finder/Navbar'
import Reset from './property-finder/Reset'
import Home from './property-finder/Home'

export default function App() {
  const [login,setLogin]=useState(false)
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  },[login])
  return (
    <>
     <BrowserRouter>
     <Navbar login={login} setLogin={setLogin}/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/userlogin' element={<Login  login={login} setLogin={setLogin}/>}></Route>
      <Route path='/userregister' element={<Register  login={login} setLogin={setLogin}/>}></Route>
      <Route path='/email' element={<Email/>}></Route>
      <Route path='/userdashboard' element={<Buyprop/>}></Route>
      <Route path='/otp' element={<Otp/>}></Route>
      <Route path='/buyprop' element={<Buyprop/>}></Route>
      <Route path='/confirm' element={<Confirmation/>}></Route>
      <Route path='/sellhouse' element={<Sellhouse/>}></Route>
      <Route path='/sellapartment' element={<Sellapartment/>}></Route>
      <Route path='/sellland' element={<Sellland/>}></Route>
      <Route path='/filterapartments' element={<Filterapartment/>}></Route>
      <Route path='/filterlands' element={<Filterlands/>}></Route>
      <Route path='/filterhouses' element={<Filterhouses/>}></Route>
      <Route path='/getownerdetails' element={<Owner/>}></Route>
      <Route path='/forgot' element={<Reset/>}></Route>
     </Routes>
     </BrowserRouter> 
    </>
  )
}
