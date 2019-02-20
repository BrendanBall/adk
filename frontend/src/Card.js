import React from 'react'
import { DragSource } from 'react-dnd'
import './Card.css'
import { ItemTypes } from './constants'

function Card ({ card, connectDragSource, isDragging }) {
  return connectDragSource(
    <div className='Card' style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{card.title}</h3>
    </div>
  )
}

const cardSource = {
  beginDrag (props) {
    return { card: props.card, ctx: props.ctx }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card)
