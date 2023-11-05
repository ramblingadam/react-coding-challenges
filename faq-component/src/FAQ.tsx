import Question from './Question.tsx'

const FAQ = ({questions}) => {
  
  return (
    <section>
      <h1>Frequently Asked Questions</h1>
      <ul className='faq-questions-wrapper'>
        {questions.map((question, i) => (
          <Question question={question} index={i} open={question.open} key={i}/>
        ))}
      </ul>

    </section>
  )
}

export default FAQ