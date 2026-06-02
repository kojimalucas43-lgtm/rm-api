import s from './App.module.css'
import { api } from './constants/api'
import { useState, useEffect } from 'react'
import logo from '/logo.png'

function App() {
  const [data,setData] = useState([])
  const [name,setName] = useState("")
  const [page,setPage] = useState()

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      setData(response.data.results)
    }).catch((error) => {
      console.error("Deu ruim pô", error)
    })
  }, [page,name])
  
  return (
    <>
     <img className = {s.logo} src={logo} alt='Logo Rick and Morty'/>
     <div>
        <label htmlFor=''>Search name</label>
        <input type='text' placeholder='Type the name you want' value={name} onChange={(e) => setName(e.target.value)}/>
     </div>
     <div>
        <label htmlFor=''>Choose page</label>
        <input type='number' placeholder='Type the page 1/42' value={page} onChange={(e) => setPage(e.target.value)}/>
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