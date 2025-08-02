import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Guestregister() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    password: "",
    rpassword: "",
    dob: "",
  });

  // ✅ Fixed: removed array brackets
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { name, mobile, email, gender, password, rpassword, dob } = data;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post("http://localhost:4000/userregister", {
        name,
        mobile,
        email,
        gender,
        password,
        rpassword,
        dob,
        token,
      });

      const responseData = response.data;
      console.log(responseData);

      if (responseData.response === "0") {
        setResponse("Passwords do not match");
      } else if (responseData.response === "1") {
        alert("Registration successful");
        navigate("/userlogin");
      } else if (responseData.response === "2") {
        setResponse("Email already exists");
      } else {
        setResponse(responseData.response);
      }

    } catch (error) {
      console.error("Registration failed:", error);
      setResponse("Network error. Please check server connection.");
    }
  };

  return (
    <div className="logincontainer">
      <center>
        <div className="display-5">User Register</div>
      </center>
      <form onSubmit={submitHandler} method="post">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            required
            type="text"
            className="form-control"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile:</label>
          <input
            required
            type="number"
            className="form-control"
            name="mobile"
            value={mobile}
            placeholder="Enter your mobile number"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            required
            type="email"
            className="form-control"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={changeHandler}
          />
        </div>
        <label className="form-label">Gender:</label>
        <div className="form-check">
          <input
            required
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            onChange={changeHandler}
            checked={gender === "male"}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            required
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            onChange={changeHandler}
            checked={gender === "female"}
          />
          <label className="form-check-label">Female</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            required
            type="password"
            className="form-control"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Re-enter Password</label>
          <input
            required
            type="password"
            className="form-control"
            name="rpassword"
            value={rpassword}
            placeholder="Re-enter your password"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input
            required
            type="date"
            className="form-control"
            name="dob"
            value={dob}
            onChange={changeHandler}
          />
        </div>
        <center>
          <button type="submit" className="btn btn-outline-success">
            Register
          </button>
        </center>
      </form>
      <br />
      <div className="container">
        <div className="row">
          <center>
            <h6>{response}</h6>
          </center>
        </div>
      </div>
      <br />
      <div className="container-fluid">
        <div className="row">
          <div>
            <p>
              Already have an account?{" "}
              <Link to="/userlogin" className="loglink">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
