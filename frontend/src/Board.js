import React, { useState } from 'react'

import Stage from './Stage'
import './Board.css'

export default function Board () {
  const [tasks, setTasks] = useState({ a: { id: 'a', title: 'Thing1', stage: 1 } })
  const moveTask = (id, stage) => setTasks({ ...tasks, [id]: { ...tasks[id], stage } })

  return (
    <div className='Board'>
      <Stage key={1} tasks={Object.values(tasks).filter(t => t.stage === 1)} stage={1} moveTask={moveTask}></Stage>
      <Stage key={2} tasks={Object.values(tasks).filter(t => t.stage === 2)} stage={2} moveTask={moveTask}></Stage>
    </div>
  )
}
