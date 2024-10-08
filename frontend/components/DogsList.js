import React, { useState, useEffect } from "react";

export default function DogsList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    function getDogs() {
      fetch("http://localhost:3003/api/dogs")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Ouch, status ${res.status}`);
          }
          const contentType = res.headers.get("Content-Type");
          if (contentType.includes("application/json")) {
            console.log("We are getting dogs... but they have not arrived yet!");
            return res.json(); // res.json returns a promise
          }
        })
        .then((data) => {
          console.log(data);
          setDogs(data);
        })
        .catch((err) => {
          console.log("Something went wrong GETing dogs...", err);
        });
    }
    getDogs();
  }, []);

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.map((dog) => {
          return (
            <li key={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? "adopted" : "NOT adopted"}
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
