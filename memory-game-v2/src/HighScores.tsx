/*
{
  easy: [
    {
      seconds: number (of seconds)
      name: string
      date: string
    }
  ]
  medium: [
    {
      seconds: number (of seconds)
      name: string
      date: string
    }
  ]
  hard: [
    {
      seconds: number (of seconds)
      name: string
      date: string
    }
  ]
}
*/
import {useState, useEffect} from 'react'
import './HighScores.css'

class Score {
  seconds: number
  name: string
  constructor(seconds: number, name: string) {
    this.seconds = seconds
    this.name = name
  }
}


const DEFAULT_SCORES = {
    easy: new Array(10).fill(new Score(3600, 'Bob', '2023/1/1')),
    medium: new Array(10).fill(new Score(3600, 'Bob', '2023/1/1')),
    hard: new Array(10).fill(new Score(3600, 'Bob', '2023/1/1')),
  }

const HighScores = ({difficulty, gameState, elapsedSeconds}) => {
  const [scores, setScores] = useState(localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : DEFAULT_SCORES)

  const [newHighScore, setNewHighScore] = useState(false)
  const [nameEntry, setNameEntry] = useState('')

  // Put default scores in localStorage if not present.
  useEffect(() => {
    if(!localStorage.getItem('scores')) {
      localStorage.setItem('scores', JSON.stringify(DEFAULT_SCORES))
    }
  }, [])
  
  // This effect will let the user input their name if they got a high score.
  useEffect(() => {
    if(gameState !== 'over') return
    
    const currentDiffScores = JSON.parse(localStorage.getItem('scores'))[difficulty].sort((a,b) => a.seconds - b.seconds)
    const lowestScore = currentDiffScores[9]
    if(elapsedSeconds < lowestScore.seconds) {
      console.log('new high score!')
      setNewHighScore(true)
    }
  }, [gameState])

  useEffect(() => {
    if(!newHighScore) return
    document.querySelector('#high-score-name').focus()
  }, [newHighScore])
  
  const handleNameEntryChange = (e) => {
    setNameEntry(e.target.value)
  }
  
  const handleHighScoreSubmit = (e) => {
    e.preventDefault()
    const currentDiffScores = JSON.parse(localStorage.getItem('scores'))[difficulty].sort((a,b) => a.seconds - b.seconds)
    currentDiffScores[9] = new Score(elapsedSeconds, nameEntry)
    currentDiffScores.sort((a,b) => a.seconds - b.seconds)
    const allScores = {
      ...scores,
      [difficulty]: currentDiffScores
    }
    setScores(allScores)
    setNewHighScore(false)
    localStorage.setItem('scores', JSON.stringify(allScores))
  }
  
  return (
    <section className='high-scores-wrapper'>
      {gameState === 'new' && (
        <h2 className='high-scores-heading'>High Scores</h2>
      )}
      <div className='high-score-tables-wrapper'>
        {(difficulty === 'easy' || difficulty === null) && (
        <ul className='easy scores-list-wrapper'>
          <h3 className='high-scores-heading'>Easy</h3>
          {scores.easy.map((score, i) => (
          <li className='score-wrapper' key={i}>
            <span className='score-seconds'>
          {`${(Math.floor(score.seconds / 60)).toString().padStart(2, '0')}:${(score.seconds % 60).toString().padStart(2, '0')}`}
            </span>
          <span className='score-name'>{score.name}</span>
          </li>
          ))}
        </ul>
        )}
        
        {(difficulty === 'medium' || difficulty === null) && (
          <ul className='medium scores-list-wrapper'>
            <h3 className='high-scores-heading'>Medium</h3>
            {scores.medium.map((score, i) => (
              <li className='score-wrapper' key={i}>
                <span className='score-seconds'>
                  {`${(Math.floor(score.seconds / 60)).toString().padStart(2, '0')}:${(score.seconds % 60).toString().padStart(2, '0')}`}
                </span>
                <span className='score-name'>{score.name}</span>
              </li>
            ))}
          </ul>
        )}

        {(difficulty === 'hard' || difficulty === null) && (
          <ul className='hard scores-list-wrapper'>
            <h3 className='high-scores-heading'>Hard</h3>
            {scores.hard.map((score, i) => (
            <li className='score-wrapper' key={i}>
              <span className='score-seconds'>
            {`${(Math.floor(score.seconds / 60)).toString().padStart(2, '0')}:${(score.seconds % 60).toString().padStart(2, '0')}`}
              </span>
              <span className='score-name'>{score.name}</span>
            </li>
            ))}
          </ul>
        )}

      
      </div>


      {/* HIGH SCORE ENTRY */}
      {newHighScore && (
        <form className='new-high-score-form' onSubmit={handleHighScoreSubmit}>
          
          <label className='new-high-score-label'>
            <h2 className='high-scores-heading'>New High Score!</h2>
            <input type='text' className='new-high-score-input' name='high-score-name' id='high-score-name'placeholder='Your Name' maxLength='5' value={nameEntry} onChange={handleNameEntryChange}></input>
            <button>Submit</button>
          </label>
        </form>
      )}

    </section>
  )
}

export default HighScores