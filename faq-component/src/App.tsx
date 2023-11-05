import './App.css'
import FAQ from './FAQ'

const questions = [
    {
      question: "How many bones does a cat have?",
      answer: "A cat has 230 bones - 6 more than a human",
      open: true
    },
    {
      question: "How much do cats sleep?",
      answer: "The average cat sleeps 12-16 hours per day",
      open: false
    },
    {
      question: "How long do cats live",
      answer: "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
      open: true
    },
  ]


export default function App() {
  return (
    <main>
      <FAQ questions={questions}/>
    </main>
  )
}