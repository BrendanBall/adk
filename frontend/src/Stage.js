import React from 'react'
import { DropTarget } from 'react-dnd'
import './Stage.css'
import Task from './Task'
import { ItemTypes } from './constants'

function Stage ({ stage, tasks = [], connectDropTarget }) {
  return connectDropTarget(
    <div className='Stage'>
      <h3>Stage {stage}</h3>
      <div>
        {tasks.map(t => <Task key={t.id} task={t}></Task>)}
      </div>
    </div>
  )
}

const stageTarget = {
  drop (props, monitor) {
    props.moveTask(monitor.getItem().id, props.stage)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

export default DropTarget(ItemTypes.CARD, stageTarget, collect)(Stage)
