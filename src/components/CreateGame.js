import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const API = "https://tttonline.pythonanywhere.com/api";

const CreateGame = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("game-creation-form");
    fetch(`${API}/creategame/${username}`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          navigate(`/game/${data.gameid}`);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (Cookies.get("ttt-user")) {
      setUsername(Cookies.get("ttt-user"));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h3 className="text-white my-4">Create new game</h3>
      <Link
        to={"/"}
        className="btn btn-outline-light"
        style={{ borderRadius: "50px", float: "right" }}
      >
        Home
      </Link>
      <br />
      <br />
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
              <h5 className="card-title mb-4">Choose oponent</h5>
              <form id="game-creation-form" onSubmit={handleSubmit}>
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
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ float: "right", borderRadius: "50px" }}
                >
                  Create game
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default CreateGame;
