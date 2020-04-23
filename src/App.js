import React, { useState, useEffect } from 'react'
import MostraVoltas from './components/MostraVoltas'
import MostraTempo from './components/MostraTempo'
import Button from './components/Button'
import './styles.css'

function App() {
  const [ numVoltas, setVoltas ] = useState(0)
  const [ running, setRunning ] = useState(false)
  const [ tempo, setTempo ] = useState(0)
  
  useEffect(() => {
    let timer = null
    if(running){
      timer = setInterval(() => {
        setTempo(old => old+1)
      }, 1000)
    }
    return () => {
      if(timer) {
        clearInterval(timer)
      }
    }
  }, [running])

  const toggleRunning = () => {
    setRunning(!running)
  }

  const increment = () => {
    setVoltas(numVoltas+1)
  }

  const decrement = () => {
    if (numVoltas > 0) {
      setVoltas(numVoltas-1)
    }
  }

  const reset = () => {
    setTempo(0)
    running(false)
    setVoltas(0)
  }

  return (
    <div>
      <MostraVoltas voltas={ numVoltas }/>
      <Button text='+' className="bigger" onClick={ increment }/>
      <Button text='-' className="bigger" onClick={ decrement }/>
      {
        numVoltas > 0 &&
        <MostraTempo tempo={ Math.round(tempo/numVoltas) }/>
      }
      <Button onClick={ toggleRunning } text={ running ? 'Pausar' : 'Iniciar' } />
      <Button onClick={ reset } text='Reiniciar' />
    </div>
  );
}

export default App
