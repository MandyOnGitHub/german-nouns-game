import { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'

function App() {
  const [nouns, setNouns] = useState([])

  const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json'

  useEffect(()=>{
    (async()=>{
      const response = await axios.get(nounsUrl)
      setNouns(response.data)
    })();
  })

  return (
    <div className="App">
        <h1>German Nouns</h1>
        <p>There are {nouns.length} nouns.</p>
    </div>
  )
}

export default App
