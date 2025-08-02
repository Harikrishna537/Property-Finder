import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Buyprop() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/getapartments")
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data);
        console.log("this one");
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/gethouses")
      .then((resp) => {
        setData1(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getlands")
      .then((resp) => {
        setData2(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const submitFilter = (e) => {
    e.preventDefault();
    if(filter==="apartments"){
      navigate('/filterapartments')
    }
    else if(filter==="lands"){
      navigate('/filterlands')
    }
    else{
      navigate('/filterhouses')
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "10px",
          width: "200px",
          marginLeft: "1000px",
        }}
      >
        <form onSubmit={submitFilter} style={{ display: "flex" }}>
          <div class="input-group">
            <select
              class="custom-select"
              id="inputGroupSelect04"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option  value="">
                Select
              </option>
              <option value="apartments">Apartments</option>
              <option value="lands">Lands</option>
              <option value="houses">Houses</option>
            </select>
          </div>
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="submit">
              Filter
            </button>
          </div>
        </form>
      </div>
      <div>
        {data.length > 0 ? (
          <>
            <div>
              <div className="container">
                <center>
                  <h2>Apartments</h2>
                </center>
                <div className="row">
                  {data.map((item) => {
                    return (
                      <div
                        className="col-6"
                        key={item._id}
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            margin: "10px",
                            overflow: "hidden",
                            gap: "20px",
                          }}
                        >
                          <img alt=" "
                            src={item.img1}
                            style={{
                              width: "250px",
                              height: "200px",
                              margin: "10px auto",
                              borderRadius: "10px",
                            }}
                          />
                          <img alt=" "
                            src={item.img2}
                            style={{
                              width: "250px",
                              height: "200px",
                              margin: "10px auto",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <center>
                          <h5>Details:</h5>
                        </center>
                        <div
                          className="card"
                          style={{ width: "80%", margin: "10px auto" }}
                        >
                          <table
                            style={{
                              padding: "100px",
                              width: "60%",
                              margin: "auto",
                            }}
                          >
                            <tr>
                              <td>
                                <strong>Year built</strong>
                              </td>
                              <td>{item.year}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Area</strong>
                              </td>
                              <td>{item.area}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Rooms type</strong>
                              </td>
                              <td>{item.roomstype}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Floors</strong>
                              </td>
                              <td>{item.floors}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Parking</strong>
                              </td>
                              <td>{item.parking}</td>
                            </tr>
                          </table>
                          <br />
                          <center>
                            <Link to='/getownerdetails'>
                            <button
                              className="btn btn-success"
                              style={{ margin: "10px" }}
                            >
                              Get owner details
                            </button>
                            </Link>
                          </center>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <center><h1>Loading...........</h1></center>
        )}
      </div>
      <div>
        {data1.length > 0 ? (
          <>
            <div>
              <div className="container">
                <center>
                  <h2>Houses</h2>
                </center>
                <div className="row">
                  {data1.map((item) => {
                    return (
                      <div
                        className="col-6"
                        key={item._id}
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            margin: "10px",
                            overflow: "hidden",
                            gap: "20px",
                          }}
                        >
                          <img alt=" "
                            src={item.img1}
                            style={{
                              width: "250px",
                              height: "200px",
                              margin: "10px auto",
                              borderRadius: "10px",
                            }}
                          />
                          <img alt=" "
                            src={item.img2}
                            style={{
                              width: "250px",
                              height: "200px",
                              margin: "10px auto",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <center>
                          <h5>Details:</h5>
                        </center>
                        <div
                          className="card"
                          style={{ width: "80%", margin: "10px auto" }}
                        >
                          <table
                            style={{
                              padding: "100px",
                              width: "60%",
                              margin: "auto",
                            }}
                          >
                            <tr>
                              <td>
                                <strong>Year built</strong>
                              </td>
                              <td>{item.year}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Area</strong>
                              </td>
                              <td>{item.area}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>House type</strong>
                              </td>
                              <td>{item.housetype}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Address</strong>
                              </td>
                              <td>{item.address}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Cost</strong>
                              </td>
                              <td>{item.cost}</td>
                            </tr>
                          </table>
                          <br />
                          <center>
                            <Link to="/getownerdetails"><button
                              className="btn btn-success"
                              style={{ margin: "10px" }}
                            >
                              Get owner details
                            </button></Link>
                          </center>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          console.log("Hello")
        )}
      </div>
      <div>
        {data2.length > 0 ? (
          <>
            <div>
              <div className="container">
                <center>
                  <h2>Lands</h2>
                </center>
                <div className="row">
                  {data2.map((item) => {
                    return (
                      <div
                        className="col-6"
                        key={item._id}
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            margin: "10px",
                            overflow: "hidden",
                            gap: "20px",
                          }}
                        >
                          <img alt=" "
                            src={item.img1}
                            style={{
                              width: "250px",
                              height: "200px",
                              margin: "10px auto",
                              borderRadius: "10px",
                            }}
                          />
                          <img alt=" "
                            src={item.img2}
                            style={{
                              width: "250px",
                              height: "200px",
                              margin: "10px auto",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <center>
                          <h5>Details:</h5>
                        </center>
                        <div
                          className="card"
                          style={{ width: "80%", margin: "10px auto" }}
                        >
                          <table
                            style={{
                              padding: "100px",
                              width: "60%",
                              margin: "auto",
                            }}
                          >
                            <tr>
                              <td>
                                <strong>Land shape</strong>
                              </td>
                              <td>{item.shape}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Area</strong>
                              </td>
                              <td>{item.area}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Land type</strong>
                              </td>
                              <td>{item.landtype}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Cost</strong>
                              </td>
                              <td>{item.cost}</td>
                            </tr>
                          </table>
                          <br />
                          <center>
                            <Link to='/getownerdetails'>
                            <button
                              className="btn btn-success"
                              style={{ margin: "10px" }}
                            >
                              Get owner details
                            </button>
                            </Link>
                          </center>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          console.log("hii")
        )}
      </div>
    </>
  );
}
