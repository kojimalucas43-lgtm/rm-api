import s from './App.module.css'
import { api } from './constants/api'
import { useState, useEffect } from 'react'
import logo from '/rm.png'

function App() {
  const [data,setData] = useState([])

  useEffect(() => {
    api.get(`/character`).then((response) => {
      setData(response.data.results)
    }).catch((error) => {
      console.error("Deu ruim pô", error)
    })
  }, [])
  
  return (
    <>
     <img className = {s.logo} src={logo} alt='Logo Rick and Morty'/>
     <div>
        <label htmlFor=''>Search name</label>
        <input type='text' placeholder='Type the name you want'/>
     </div>
     <main>
        {data.map((item, index) => {
          return(
            <div>
            <img src={item.image} alt={item.name} />
            <h2>Name: {item.name}</h2>
            <p>Species: {item.species}</p>
            {item.status === "Dead" ? "Status: 💀": item.status === "Alive" ? "Status: 😊" : <p>Status: {item.status}</p>} 
            <p>Origin: {item.origin.name}</p>
            </div>
          )

        })}
    </main>
    </>
  )
}

export default App