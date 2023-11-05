import { useState } from 'react'

interface QuestionProps {
  question: {
    question: string
    answer: string
  }
  index: number
  open: boolean
}

const Question: React.FC<QuestionProps> = ({ question, index, open }) => {
  const [expanded, setExpanded] = useState<boolean>(open || index === 0)

  const handleQuestionClick = () => {
    console.log(expanded)
    setExpanded(!expanded)
  }

  return (
    <li
      className='question-wrapper'
      onClick={handleQuestionClick}
    >
      <div className='chevron-column'>
        <div className={`chevron${expanded ? ' open' : ''}`}>{'>'}</div>
      </div>

      <div className='question-text-wrapper'>
        <div className='question'>{question.question}</div>
        <div className={`answer${!expanded ? ' hidden' : ''}`}>
          {question.answer}
        </div>
      </div>
    </li>
  )
}

export default Question
