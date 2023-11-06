function Card({ value, selected, cleared, handleSelection }) {
  
  return (
    <div className='card-wrapper'>
      <div className={`card${cleared ? ' cleared' : ''}${selected ? ' selected' : ''}`} onClick={handleSelection}>
        <div className={`card-text${!selected ? ' unselected' : ''}`}>
          {value}
        </div>
      </div>
    </div>
  )
}

export default Card