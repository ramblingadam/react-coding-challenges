class HistoryItem {
  buttonPressed: string
  prevValue: number
  newValue: number
  constructor(buttonPressed:string, prevValue:number, newValue:number) {
    this.buttonPressed = buttonPressed
    this.prevValue = prevValue
    this.newValue = newValue
  }
}

const AddButton = ({value, history, setHistory, currentIndex, setCurrentIndex}) => {
  const handleButtonClick = () => {
    const prevValue = history[currentIndex].newValue
    const newValue = prevValue + value    
    console.log(currentIndex)
    const newHistItem = new HistoryItem(value, prevValue, newValue)
    console.log(newHistItem)
    console.log(history)

    localStorage.setItem('history', JSON.stringify([...history.slice(0, currentIndex + 1), newHistItem]))
    localStorage.setItem('currentIndex', currentIndex + 1)
    setHistory([...history.slice(0, currentIndex + 1), newHistItem])
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <button onClick={handleButtonClick}>
      {value >= 0 ? `+${value}` : `${value}`}
    </button>
  )
}

export default AddButton