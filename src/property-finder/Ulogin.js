import React, { useState } from 'react'
import '../css/Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {
  const [result, setResult] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const loginData = async () => {
      try {
        setLoading(true)
        setResult('')
        const response = await axios.post('http://localhost:4000/userlogin', { email, password })
        const responseData = response.data

        if (responseData.response === '0') {
          setResult('User does not exist')
        } else if (responseData.response === '1') {
          localStorage.setItem('token', responseData.token)
          props.setLogin(true)
          navigate('/userdashboard')
        } else if (responseData.response === '2') {
          setResult('Invalid credentials')
        } else {
          setResult(responseData.response)
        }
      } catch (error) {
        setResult('Server error. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loginData()
  }

  return (
    <>
      <div className='logincontainer'>
        <center><h3 className='display-6'>User Login</h3></center>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email address</label>
            <input
              required
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setResult('') }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setResult('') }}
            />
          </div>
          <center>
            <button type="submit" className="btn btn-outline-danger" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </center>
        </form><br />
        
        <div className="container">
          <div className="row">
            <center>
              <h6 style={{ color: 'red' }}>{result}</h6>
            </center>
          </div>
        </div><br />

        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <p>Don't have an account? <Link to='/userregister' id="reglink">Register</Link></p>
            </div>
            <div className='col-6 text-end'>
              <Link to='/email' id='forgot'>Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
