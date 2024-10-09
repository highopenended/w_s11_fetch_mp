import React, {useState, useEffect} from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

const initialState_CurrentDog = {
  'id':'', 
  'name':'',
  'breed':'',
  'adopted':false
}

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [currentDog, setCurrentDog]=useState(initialState_CurrentDog)

  useEffect(()=>{
    console.log(currentDog)
  },[])


  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList dogs={dogs} setDogs={setDogs} setCurrentDog={setCurrentDog} />} />
        <Route path="/form" element={<DogForm currentDog={currentDog}/>} />
      </Routes>
    </div>
  )
}
