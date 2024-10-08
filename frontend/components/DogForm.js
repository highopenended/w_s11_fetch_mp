import React, { useState, useEffect } from 'react'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm() {
  const [values, setValues] = useState(initialForm)
  const [breedOptions, setBreedOptions]=useState(['---Select Breed---'])


  useEffect(()=>{
    async function getBreedOptions(){
      fetch('http://localhost:3003/api/dogs/breeds')
        .then(res=>{
          if(!res.ok) throw new Error("Couldn't fetch dog breeds...")

          const contentType = res.headers.get("Content-Type");
          if (contentType.includes('application/json')) {
            console.log('Fetching Dog Breeds...')
            return res.json()
          }
        })
        .then(data=>{
          setBreedOptions(['---Select Breed---', ...data])
        })
        .catch(err=>{
          console.error("Couldn't fetch dog breeds...", err)
        })
    }
    getBreedOptions()
  },[])



  const onSubmit = (event) => {
    event.preventDefault()

    
  }

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div>
      <h2>
        Create Dog
      </h2>
      <form onSubmit={onSubmit}>
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
          {breedOptions.map(val=>{
            return <option>{val}</option>
          })}
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            Create Dog
          </button>
          <button aria-label="Reset form">Reset</button>
        </div>
      </form>
    </div>
  )
}
