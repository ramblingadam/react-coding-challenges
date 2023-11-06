/*
3 second delay to turn back around
user cannot click more than two cards
random cards

make a deck- array of objs. 
[
  {
    value: number,
    selected: false
    cleared: false
  }
]


*/


import './App.css'
import {useState} from 'react'
import Card from './Card.tsx'

class CardClass {
  value: number
  selected: boolean
  cleared: boolean
  constructor(value:number, selected:boolean = false, cleared:boolean = false) {
    this.value = value
    this.selected = selected
    this.cleared = cleared
  }
}

const buildDeck = () => {
  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  
  const deck = []
  for(let i = 1; i <= 18; i ++) {
    deck.push(new CardClass(i))
    deck.push(new CardClass(i))
  }
  const shuffled = shuffle(deck)
  return shuffled
}

export default function App() {
  const [deck, setDeck] = useState(buildDeck())
  const [selected, setSelected] = useState(null)
  const [delayRunning, setDelayRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const handleSelection = (card, i) => {
    if(delayRunning) return
    if(selected === null ) {
      setSelected({...card, id: i})
      const deckCopy = deck
      deckCopy[i].selected = true
      setDeck([...deckCopy])
      return
    }
    if(selected.id === i) {
      console.log('already selected')
      return
    } else {
      setDelayRunning(true)
      let deckCopy = deck
      deckCopy[i].selected = true
      setDeck([...deckCopy])
      if(selected.value === card.value) {
        deckCopy = deckCopy.map(card => {
            if(card.value === selected.value) {
              return {...card, cleared: true}
            } else return card
          })
        console.log('match!')
        setTimeout(() => {
          setDeck(deckCopy)
          setDelayRunning(false)
          if(deckCopy.every(card => card.cleared === true)) {
            console.log('YOU WIN')
            setGameOver(true)
          }
        }, 300)
      } else {
        console.log('mismatch!')
        const deckCopy = deck
        setTimeout(() => {
          setDeck(deckCopy.map(card => {return {...card, selected: false}}))
          setDelayRunning(false)
        }, 300)
      }
      setSelected(null)
    }
  }

  const handleResetClick = () => {
    setDeck(buildDeck())
    setGameOver(false)
  }
  
  return (
    <main>
      <h1>Memory Game</h1>
      <section className='board-wrapper'>
        {deck.map((card, i) => (
      <Card value={card.value} selected={card.selected} cleared={card.cleared} key={i} handleSelection={() => handleSelection(card, i)}/>
        ))}
      </section>
      {gameOver && (
      <button onClick={handleResetClick}>Play again</button>
      )}
    </main>
  )
}