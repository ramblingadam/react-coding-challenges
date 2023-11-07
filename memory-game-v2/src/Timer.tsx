import {useState} from 'react'
import {useEffect} from'react'

const Timer = ({timerRunning, resetTimer, setResetTimer, gameState, elapsedSeconds, setElapsedSeconds}) => {
  // const [elapsedSeconds, setElapsedSeconds] = useState(0)

  let interval = null
  useEffect(() => {
    if(resetTimer) {
      setElapsedSeconds(0)
      setResetTimer(false)
    }

    if (timerRunning) {
      interval = setInterval(() => {

        setElapsedSeconds((prevSeconds:number) => {
          if(prevSeconds >= 5999) return 5999
          else return  prevSeconds + 1
        });
        }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [timerRunning])


  const seconds = elapsedSeconds % 60
  const minutes = Math.floor(elapsedSeconds / 60)
  
  return (
    <div className='timer-wrapper'>
      {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </div>
  )
}

export default Timer