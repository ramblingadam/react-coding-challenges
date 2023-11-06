const Card = ({value, selected, cleared, handleCardClick}) => {


  return (
    <div 
      className={`card-wrapper
        ${cleared ? ' cleared' : ''}
        ${selected ? ' selected' : ''}`
      } 
      onClick={handleCardClick}
    >
      <div className='content'>
        <div className={`card-back`}></div>
        <div className='card-front'>{value}</div>
      </div>

      
    </div>
  )
}

export default Card