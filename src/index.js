import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import AnimalForm from './components/AnimalForm'

function App() {
  return (
    <div className="App">
      <AnimalForm />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
