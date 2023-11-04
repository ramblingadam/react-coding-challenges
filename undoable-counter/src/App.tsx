/*
// history should be rep'd by an array of objects, with properties of buttonPressed, prevValue, newValue
// state: current index of where we are in history, history array itself
// display the newValue of the history object at the current index

// undo steps currentIndex back 1, redo stpes it forward, asusming we're not at last index
what if we undo, then change the value with a button, then redo?




*/


import './App.css'
import AddButton from './AddButton'
import DoButton from './DoButton'
import History from './History'
import {useState} from 'react'







export default function App() {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')!) || [{newValue: 0}])
  const [currentIndex, setCurrentIndex] = useState(JSON.parse(localStorage.getItem('currentIndex')!) || 0)

  
  return (
    <main className='app-wrapper'>
      <h1>Undoable Counter</h1>
      <section className='doButtons-wrapper'>
        <DoButton undo={true} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} history={history}/>
        <DoButton undo={false} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} history={history}/>
      </section>
      <section className='addButtons-wrapper'>
        <AddButton value={-100} history={history} setHistory={setHistory} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
        <AddButton value={-10} history={history} setHistory={setHistory} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
        <AddButton value={-1} history={history} setHistory={setHistory} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
        <span className='current-value'>{history[currentIndex].newValue}</span>
        <AddButton value={+1} history={history} setHistory={setHistory} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
        <AddButton value={+10} history={history} setHistory={setHistory} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
        <AddButton value={+100} history={history} setHistory={setHistory} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
      </section>
      <History history={history.slice(1, currentIndex + 1).reverse()}/>
    </main>
  )
}