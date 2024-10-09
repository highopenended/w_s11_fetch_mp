import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DogsList({ dogs, getDogs, setCurrentDog }) {
  const navigate = useNavigate();

  useEffect(() => {
    getDogs();
    setCurrentDog();
  }, []);

  const clickHandler_edit = (dog) => {
    setCurrentDog(dog);
    navigate("/form");
  };

  const clickHandler_delete = (id) => {
    async function deleteDog() {
      fetch(`http://localhost:3003/api/dogs/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(`Couldn't delete id: ${id}`, err));
      getDogs();
    }
    deleteDog();
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
                <button onClick={() => clickHandler_edit(dog)}>Edit</button>
                <button onClick={() => clickHandler_delete(dog.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
