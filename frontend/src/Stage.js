import React from 'react'
import { DropTarget } from 'react-dnd'
import './Stage.css'
import Card from './Card'
import { ItemTypes } from './constants'

function Stage ({ stage, ctx, connectDropTarget }) {
  return connectDropTarget(
    <div className='Stage'>
      <h3>{stage.title}</h3>
      <div>
        {
          Object.values(stage.cards).map(c =>
            <Card
              key={c.id}
              ctx={{ ...ctx, stageId: stage.id }}
              card={c}>
            </Card>)
        }
      </div>
    </div>
  )
}

const stageTarget = {
  drop (props, monitor) {
    props.moveCard(monitor.getItem(), { swimlaneId: props.ctx.swimlaneId, stageId: props.stage.id })
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

export default DropTarget(ItemTypes.CARD, stageTarget, collect)(Stage)
