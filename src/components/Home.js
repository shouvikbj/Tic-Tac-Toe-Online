import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const API = "https://tttonline.pythonanywhere.com/api";

const Home = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [games, setGames] = useState([]);

  const logout = () => {
    Cookies.remove("ttt-user")
    navigate("/login")
  }

  useEffect(() => {
    if (Cookies.get("ttt-user")) {
      setUsername(Cookies.get("ttt-user"));
      fetch(`${API}/getgames/${Cookies.get("ttt-user")}`, {
        method: "POST",
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === "ok") {
            setGames(data.gamelist);
          } else {
            alert("Cannot fetch games!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="container">
      <h3 className="text-white mt-4">Welcome!</h3>
      <p className="text-white mb-4">{username}</p>
      <Link
        to={"/create"}
        className="btn btn-outline-light"
        style={{ borderRadius: "50px", float: "right" }}
      >
        New game
      </Link>
      <br />
      <br />
      <br />
      <div>
        {games.map((game) => {
          return (
            <Link
              to={`/game/${game.gameid}`}
              key={game.gameid}
              className="btn btn-light w-100 mb-2"
              style={{borderRadius: "20px"}}
            >
              <span style={{fontWeight: "bold"}}>Game between</span>
              <br />
              {game["participants"][0][0]}
              <br />
              and
              <br />
              {game["participants"][1][0]}
            </Link>
          );
        })}
      </div>
      <br />
      <button
        className="btn btn-outline-warning"
        style={{ borderRadius: "50px", float: "left" }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
