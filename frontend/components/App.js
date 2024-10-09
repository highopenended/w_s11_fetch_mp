import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DogForm from "./DogForm";
import DogsList from "./DogsList";
import { useNavigate } from "react-router-dom";

const initialState_CurrentDog = {
  id: "",
  name: "",
  breed: "",
  adopted: false,
};

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [breedOptions, setBreedOptions] = useState(["---Select Breed---"]);
  const [currentDog, setCurrentDog] = useState(initialState_CurrentDog);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBreedOptions() {
      fetch("http://localhost:3003/api/dogs/breeds")
        .then((res) => {
          if (!res.ok) throw new Error("Couldn't fetch dog breeds...");
          const contentType = res.headers.get("Content-Type");
          if (contentType.includes("application/json")) {
            console.log("Fetching Dog Breeds...");
            return res.json();
          }
        })
        .then((data) => {
          setBreedOptions(["---Select Breed---", ...data]);
        })
        .catch((err) => {
          console.error("Couldn't fetch dog breeds...", err);
        });
    }
    getBreedOptions();
  }, []);

  async function getDogs() {
    fetch("http://localhost:3003/api/dogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ouch, status ${res.status}`);
        }
        const contentType = res.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
          return res.json();
        }
      })
      .then((data) => {
        setDogs(data);
        navigate("/");
      })
      .catch((err) => console.log("Something went wrong GETing dogs...", err));
    console.log("got dogs");
  }

  async function updateDog(dog) {
    fetch(`http://localhost:3003/api/dogs/${dog.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: dog.id,
        name: dog.name,
        breed: dog.breed,
        adopted: dog.adopted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problem PUTing dog");
        }
        response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  }

  async function addDog(dog) {
    fetch("http://localhost:3003/api/dogs", {
      method: "POST",
      body: JSON.stringify({
        name: dog.name,
        breed: dog.breed,
        adopted: dog.adopted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problem POSTing dog");
        }
        response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <DogsList
              dogs={dogs}
              getDogs={getDogs}
              setDogs={setDogs}
              setCurrentDog={setCurrentDog}
            />
          }
        />
        <Route
          path="/form"
          element={
            <DogForm
              breedOptions={breedOptions}
              setCurrentDog={setCurrentDog}
              currentDog={currentDog}
              updateDog={updateDog}
              addDog={addDog}
            />
          }
        />
      </Routes>
    </div>
  );
}
