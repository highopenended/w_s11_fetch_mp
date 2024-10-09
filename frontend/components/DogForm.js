import React, { useState, useEffect } from "react";

const initialForm = { name: "", breed: "", adopted: false };

// Use this form for both POST and PUT requests!
export default function DogForm({
  breedOptions,
  currentDog,
  setCurrentDog,
  updateDog,
  addDog,
}) {
  const [values, setValues] = useState(initialForm);
  useEffect(() => {
    // if(currentDog) setValues(currentDog)
    currentDog ? setValues(currentDog) : setValues(initialForm);
  }, []);

  const onReset = (evt) => {
    evt.preventDefault();
    setCurrentDog();
    setValues(initialForm);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    console.log("running the submission check");
    if (currentDog) {
      const newDog = {
        id: currentDog.id,
        name: values.name,
        breed: values.breed,
        adopted: values.adopted,
      };
      updateDog(newDog);
      console.log("Edited");
    } else {
      const newDog = {
        name: values.name,
        breed: values.breed,
        adopted: values.adopted,
      };
      addDog(newDog);
      console.log("Submitted");
    }
  };

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div>
      <h2>{currentDog ? "Update Dog" : "Create Dog"}</h2>
      <form>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          {breedOptions.map((val) => {
            return <option key={val}>{val}</option>;
          })}
        </select>
        <label>
          Adopted:{" "}
          <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button onClick={onSubmit} type="submit">
            {currentDog ? "Update Dog" : "Create Dog"}
          </button>
          <button aria-label="Reset form" onClick={onReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
