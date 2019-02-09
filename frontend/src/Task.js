import React from 'react'
import { DragSource } from 'react-dnd'
import './Task.css'
import { ItemTypes } from './constants'

function Task ({ task, connectDragSource, isDragging }) {
  return connectDragSource(
    <div className='Task' style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{task.title}</h3>
    </div>
  )
}

const taskSource = {
  beginDrag (props) {
    return { id: props.task.id }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(ItemTypes.CARD, taskSource, collect)(Task)
