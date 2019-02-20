import React from 'react'
import './Swimlane.css'
import Stage from './Stage'

export function Swimlane ({ swimlane, moveCard }) {
  return (
    <div className='Swimlane'>
      <h3>{swimlane.title}</h3>
      <div className='stages'>
        {
          Object.values(swimlane.stages).map(st =>
            <Stage
              key={st.id}
              stage={st}
              ctx={ { swimlaneId: swimlane.id }}
              moveCard={moveCard} >
            </Stage>)}
      </div>
    </div>
  )
}
