import { useEffect, useState } from "react";
import "./App.css";
import {
  PostJoke,
  deleteTheJoke,
  getAllJokes,
  toldOrUntold,
} from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [inputValue, setInputvalue] = useState("");
  const [showUntoldJokes, setUntoldJokes] = useState([]);
  const [showToldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    forceRefresh();
  }, []);
  // console.log("these are the jokes", allJokes);

  useEffect(() => {
    const untoldJokes = allJokes.filter((joke) => joke.told === false);
    setUntoldJokes(untoldJokes);

    const toldJokes = allJokes.filter((joke) => joke.told === true);
    setToldJokes(toldJokes);
  }, [allJokes]);

  const handleJokePost = async () => {
    await PostJoke(inputValue);
    const updatedJokes = await getAllJokes();

    setAllJokes(updatedJokes);
    setInputvalue("");
    forceRefresh();
  };

  const forceRefresh = () => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  };

  const editJoke = async (joke) => {
    await toldOrUntold(joke);
    forceRefresh();
  };

  const deleteJoke = async (joke) => {
    await deleteTheJoke(joke);
    forceRefresh();
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={inputValue}
          onChange={(event) => {
            setInputvalue(event.target.value);
            // What's the value of event?
          }}
        />

        <button className="joke-input-submit" onClick={handleJokePost}>
          Submit
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold Jokes{" "}
            <span className="untold-count">{showUntoldJokes.length}</span>
          </h2>
          {showUntoldJokes.map((joke) => {
            return (
              <section key={joke.id}>
                <li className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button
                    onClick={() => {
                      editJoke(joke);
                    }}
                  >
                    😃
                  </button>
                  <button
                    onClick={() => {
                      deleteJoke(joke);
                    }}
                  >
                    🗑️
                  </button>
                </li>
              </section>
            );
          })}
        </div>
        <div className="joke-list-container">
          <h2>
            Told Jokes
            <span className="told-count">{showToldJokes.length}</span>
          </h2>
          {showToldJokes.map((joke) => {
            return (
              <section key={joke.id}>
                <li className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button
                    onClick={() => {
                      editJoke(joke);
                    }}
                  >
                    ☹️
                  </button>
                  <button
                    onClick={() => {
                      deleteJoke(joke);
                    }}
                  >
                    🗑️
                  </button>
                </li>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
