
const DoButton = ({ undo, currentIndex, setCurrentIndex, history }) => {
  const handleButtonClick = () => {
    switch(undo) {
      case true:
        localStorage.setItem('currentIndex', currentIndex - 1)
        setCurrentIndex(currentIndex - 1)

        break
      case false:
        localStorage.setItem('currentIndex', currentIndex + 1)
        setCurrentIndex(currentIndex + 1)
        break
      default:
        console.log('shouldnt be here')
    }
  }

  return (
    <button onClick={handleButtonClick} disabled={(undo === false && currentIndex === history.length - 1) || (undo === true && currentIndex === 0)}>
      {undo ? 'Undo' : 'Redo'}
    </button>
  )

}

export default DoButton