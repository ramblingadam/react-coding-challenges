import './Card.css'

const Card = ({value, selected, deckIcon}) => {
  

  
  return (
    <div 
      className={`select-deck-card-wrapper card-wrapper
        ${selected ? ' selected-deck' : ''}`
      } 
    >
      <div className='content'>
        <div className={`card-back`}>{deckIcon}</div>
        <div className='card-front'>{value}</div>
      </div>


    </div>
  )
}

export default Card