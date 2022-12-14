import React, { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'
import * as tools from './tools'



const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json'
const localStorageVariable = "german-noun-game"

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
      let _nouns: INoun[] = [];
      const localStorageItems = localStorage.getItem(localStorageVariable)
      if(localStorageItems !== null) {
         _nouns = JSON.parse(localStorageItems)
      } else {
        let response = (await axios.get(nounsUrl)).data
        response = tools.randomize(response)

        response.forEach((rawNoun: any) => {
          const _noun = {
            ...rawNoun,
            isOpen: false,
            isLearned: false,
          }
          _nouns.push(_noun)
        })
      }

      setNouns(_nouns)
    })();
  }, [])

  const saveApplicationState = () => {
    localStorage.setItem(localStorageVariable, JSON.stringify(nouns))
    setNouns([...nouns])
  }

  const handleToggleFlashcard = (noun: INoun) => {
    noun.isOpen = !noun.isOpen
    saveApplicationState()
  }

  const handleIsLearned = (noun: INoun) => {
    noun.isLearned = !noun.isLearned
    saveApplicationState()
  }

  const handleReset = ()=>{
    console.log("hello");
    
    localStorage.removeItem(localStorageVariable)
    window.location.reload();
  }


  return (
    <div className='App'>
      <h1>German Nouns</h1>
      <h2>You have learned {nouns.reduce((total, noun) => total + (noun.isLearned ? 1 : 0), 0)} are {nouns.length} nouns.{' '}<button onClick={()=>handleReset()}>Reset Game</button></h2>
      
      <div className='nouns'>
        {nouns.map((noun, key) => {
          return (
            <React.Fragment key={noun.singular}>
              {!noun.isLearned && (
                <div className='noun' >
                  <div className='front' onClick={() => handleToggleFlashcard(noun)}>{noun.singular}</div>
                  {noun.isOpen && (
                    <div className='back'>
                      <div className="singular">
                        {noun.article} {noun.singular}
                      </div>
                      <div className="plural">{noun.plural}</div>
                      <button onClick={() => handleIsLearned(noun)}>isLearned</button>
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default App