import { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'
import * as tools from './tools'



const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json'

interface INoun {
  article: string;
  singular: string;
  plural: string;
  isOpen: Boolean,
  isLearned: Boolean
}

function App() {
  const [nouns, setNouns] = useState<INoun[]>([])

  useEffect(() => {
    (async () => {
      let response = (await axios.get(nounsUrl)).data
      response = tools.randomize(response)
      const _nouns: INoun[] = []
      response.forEach((rawNoun: any) => {
        const _noun = {
          ...rawNoun,
          isOpen: false,
          isLearned: false,
        }
        _nouns.push(_noun)
      })
      setNouns(_nouns)
    })();
  }, [])

  const handleToggleFlashCard = (noun: INoun) => {
      noun.isOpen = !noun.isOpen
      setNouns([...nouns])
  }


  return (
    <div className='App'>
      <h1>German Nouns</h1>
      <h2>There are {nouns.length} nouns.</h2>
      <div className='nouns'>
        {nouns.map((noun, key) => {
          return (
            <div className='noun' key={noun.singular}>
              <div className='front' onClick={() => handleToggleFlashCard(noun)}>{noun.singular}</div>
              {noun.isOpen && (
                <div className='back'>
                  <div className="singular">
                    {noun.article} {noun.singular}
                  </div>
                  <div className="plural">{noun.plural}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App