import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

const API = "https://tttonline.pythonanywhere.com/api";

const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [currentmove, setCurrentmove] = useState("");
  const [game, setGame] = useState([
    ["--", "--", "--"],
    ["--", "--", "--"],
    ["--", "--", "--"],
  ]);
  const [symbol, setSymbol] = useState("O");

  const resetGame = async () => {
    await fetch(`${API}/game/${id}/reset`, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok") {
          alert("Cannot reset game!");
        }
      });
  };

  const getCurrentMove = async () => {
    await fetch(`${API}/game/${id}/getcurrentmove`, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setCurrentmove(data.currentmove);
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGameStatus = async () => {
    await fetch(`${API}/game/${id}/getgamestatus`, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setGame(data.gamestatus);
        } else {
          alert("Cannot fetch game status!");
        }
      });
  };

  const changeCurrentSymbol = async () => {
    await fetch(`${API}/game/${id}/changesymbol`, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok") {
          alert("Cannot change symbol!");
        } else {
          setSymbol(data.currentsymbol);
        }
      });
  };

  const changeCurrentMove = async () => {
    await fetch(`${API}/game/${id}/changecurrentmove`, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok") {
          alert("Cannot rotate move!");
        }
      });
  };

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (
        (board[i][0] !== "--" &&
          board[i][0] === board[i][1] &&
          board[i][0] === board[i][2]) ||
        (board[0][i] !== "--" &&
          board[0][i] === board[1][i] &&
          board[0][i] === board[2][i])
      ) {
        alert(`Winner: ${board[i][0]}`);
      }
    }
    if (
      (board[0][0] !== "--" &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]) ||
      (board[0][2] !== "--" &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0])
    ) {
        alert(`Winner: ${board[1][1]}`);
    }
  };

  const move = async (X, Y) => {
    if (currentmove === Cookies.get("ttt-user")) {
      await fetch(`${API}/game/${id}/${X}/${Y}/makemove/${symbol}`, {
        method: "POST",
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status !== "ok") {
            alert("Cannot make the move!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await changeCurrentSymbol();
      await changeCurrentMove();
      await checkWinner(game);
    } else {
      alert("Wait for your turn!");
    }
  };

  useEffect(() => {
    if (Cookies.get("ttt-user")) {
      setUsername(Cookies.get("ttt-user"));
      setInterval(getCurrentMove, 1000);
      setInterval(getGameStatus, 1000);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <h3 className="text-white mt-4">Let's Play!</h3>
      <p className="text-white" style={{ fontSize: "10px" }}>
        {id}
      </p>
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
              <div className="row my-4">
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(0, 0);
                    }}
                  >
                    {game[0][0]}
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(0, 1);
                    }}
                  >
                    {game[0][1]}
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(0, 2);
                    }}
                  >
                    {game[0][2]}
                  </button>
                </div>
              </div>
              <div className="row my-4">
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(1, 0);
                    }}
                  >
                    {game[1][0]}
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(1, 1);
                    }}
                  >
                    {game[1][1]}
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(1, 2);
                    }}
                  >
                    {game[1][2]}
                  </button>
                </div>
              </div>
              <div className="row my-4">
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(2, 0);
                    }}
                  >
                    {game[2][0]}
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(2, 1);
                    }}
                  >
                    {game[2][1]}
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => {
                      move(2, 2);
                    }}
                  >
                    {game[2][2]}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <p className="text-white">
            Current turn:
            <br />
            {currentmove}
          </p>
          <br />
          <button
            className="btn btn-outline-warning"
            style={{ borderRadius: "50px", float: "left" }}
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default Game;
