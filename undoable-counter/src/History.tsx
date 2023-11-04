
const History = ({history}) => {

  return (
    <section className='history-wrapper'>
      <h2>History</h2>
      <ul className='history-list'>
        {history.map((histItem, i) => 
          <li className='history-li' key={i}>
            <span className='btn-pressed'>
              {`${histItem.buttonPressed >= 0 ? '+' : ''}${histItem.buttonPressed}`}
            </span>
            <span>
              {`(${histItem.prevValue} -> ${histItem.newValue})`}
            </span>
          </li>
        )}
      </ul>
    </section>
  )
}

export default History