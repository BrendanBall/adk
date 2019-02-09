import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './Board'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class App extends Component {
  render () {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App">
          <Board></Board>
        </div>
      </DragDropContextProvider>
    )
  }
}

export default App
