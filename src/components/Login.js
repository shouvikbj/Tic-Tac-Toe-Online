import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const API = "https://tttonline.pythonanywhere.com/api";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    fetch(`${API}/login`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          Cookies.set("ttt-user", data.email, { expires: 365 });
          navigate("/");
        } else {
          alert("Wrong credentials!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <div
            className="card w-auto mt-4"
            style={{
              borderRadius: "20px",
              boxShadow: "0px 0px 20px 0px white",
            }}
          >
            <div className="card-body">
              <h5 className="card-title mb-4">Login from here</h5>
              <form id="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    style={{ borderRadius: "50px" }}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    style={{ borderRadius: "50px" }}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ float: "right", borderRadius: "50px" }}
                >
                  Login
                </button>
              </form>
              <Link
                to={"/signup"}
                className="btn btn-outline-success"
                style={{ float: "left", borderRadius: "50px" }}
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default Login;
