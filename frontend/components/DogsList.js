import React, { useState, useEffect } from "react";

export default function DogsList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getDogs();
  }, []);

  async function getDogs() {
    fetch("http://localhost:3003/api/dogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ouch, status ${res.status}`);
        }
        const contentType = res.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
          return res.json(); // res.json returns a promise
        }
      })
      .then((data) => setDogs(data))
      .catch((err) => {
        console.log("Something went wrong GETing dogs...", err);
      });
  }

  const clickHandler_edit = (id) => {
    console.log("Clicked Edit for id: ", id);
  };

  const clickHandler_delete = (id) => {
    console.log("Clicked Delete for id: ", id);
    fetch(`http://localhost:3003/api/dogs/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(`Couldn't delete id: ${id}`, err));
    getDogs();
  };

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.map((dog) => {
          return (
            <li key={dog.id} id={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? "adopted" : "NOT adopted"}
              <div>
                <button onClick={() => clickHandler_edit(dog.id)}>Edit</button>
                <button onClick={() => clickHandler_delete(dog.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
