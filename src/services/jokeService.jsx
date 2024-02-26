export const PostJoke = (inputValue) => {
  const API = "http://localhost:8000/jokes";
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: inputValue,
      told: false,
    }),
  });
};

export const getAllJokes = () => {
  return fetch(`http://localhost:8000/jokes`).then((res) => res.json());
};

export const toldOrUntold = async (joke) => {
  if (joke.told) {
    joke.told = false;
  } else {
    joke.told = true;
  }

  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: joke.text,
      told: joke.told,
    }),
  };
  const response = await fetch(
    `http://localhost:8000/jokes/${joke.id}`,
    putOptions
  );
};

export const deleteTheJoke = async (joke) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8000/jokes/${joke.id}`,
    deleteOptions
  );
};
