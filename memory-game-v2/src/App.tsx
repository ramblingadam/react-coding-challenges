/*
deck:
  [
    {
      value: number,
      selected: boolean,
      cleared: boolean
    }
  ]

state:
current deck (deck array)
gameOver(boolean)
selected(single card + index property)
need index to keeptrack of which was clicked on first, so that clicking on it again doesn't tirgger a math or anything



*/


import './App.css'
import {useState} from 'react'

import buildDeck from './utils.tsx'
import Card from './Card.tsx'


export default function App() {
  const [deck, setDeck] = useState(buildDeck(18))
  const [size, setSize] = useState(new Array(6).fill(6))
  const [selected, setSelected] = useState(null)
  const [delayRunning, setDelayRunning] = useState(false)
  const [gameState, setGameState] = useState('new')

  const handleDifficultyClick = (difficulty) => {
    switch(difficulty) {
      case 'easy':
        console.log('Easy selected.')
        setSize(new Array(4).fill(4))
        setDeck(buildDeck(8))
        break
      case 'medium':
        console.log('Medium selected.')
        setSize(new Array(6).fill(6))
        setDeck(buildDeck(18))
        break
      case 'hard':
        console.log('Hard selected.')
        setSize(new Array(8).fill(8))
        setDeck(buildDeck(32))
        break
      default:
        console.log(`SHOULDN'T BE HERE`)
    }
    setGameState('active')
  }


  const handleResetClick = () => {
    setGameState('new')
  }

  
  const handleCardClick = (card, i) => {
    if(delayRunning) return
    
    // console.log('clicked')
    // console.log(deck)
    // console.log(i)
    if(delayRunning) return

    if(selected === null) {
      // const deckCopy = deck
      const deckCopy = deck.map((card, cardI) => {
        if(cardI === i) {
          return {...card, selected: true}
        } else return card
      })
      setDeck(deckCopy)
      setSelected({...card, i})
      return
    }

    
    if(selected.i === i) {
      console.log('already selected')
      return
    } else {
      setDelayRunning(true)
      let deckCopy = deck.map((card, cardI) => {
        if(cardI === i) {
          return {...card, selected: true}
        } else return card
      })
      setDeck(deckCopy)
    }

    if(selected.value === card.value) {
      console.log('match found!')

      setTimeout(() => {
        const deckCopy = deck.map((card) => {
          if(card.value === selected.value) return {...card, cleared: true}
          else return card
        })
        if(deckCopy.every(card => card.cleared === true)) {
          console.log('YOU WIN!')
          setTimeout(() => {
            setGameState('over')
            setDelayRunning(false)
            }, 1000)
        }
        setDeck(deckCopy)
        setSelected(null)
        setDelayRunning(false)
      }, 800)
    } else { //mismatch
      console.log('mismatch!')
      setTimeout(() => {
        const deckCopy = deck.map((card) => {
          return {...card, selected: false}
        })
        setDeck(deckCopy)
        setSelected(null)
        setDelayRunning(false)
      }, 800)
    }
    
  }

  
  return (
    <main>
      <h1>Memory Game REDUX</h1>
      {gameState === 'new' &&  
         (
          <section className='difficulty-select'>
            <button onClick={() => handleDifficultyClick('easy')}>Easy</button>
            <button onClick={() => handleDifficultyClick('medium')}>Medium</button>
            <button onClick={() => handleDifficultyClick('hard')}>Hard</button>
          </section>
        )   
      }

      {gameState === 'active' && (
      <section className='board-wrapper'>
        {size.map((row, rowI) => (
          <div className='row' key={rowI}>
            {deck.slice(rowI * size.length, size.length * (rowI + 1)).map((card, i) => (
              <Card key={i} value={card.value} selected={card.selected} cleared={card.cleared} handleCardClick={() => handleCardClick(card, rowI * size.length + i)}/>
            ))}
          </div>
        ))}
      </section> 
      )}

      {gameState === 'over' && (
      <h2>YOU WIN!</h2>
      )}
      
      {gameState !== 'new' &&  
         (
           <button onClick={handleResetClick}>Reset</button>
         )   
      }
  
    </main>
  )
}