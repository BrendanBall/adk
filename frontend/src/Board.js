import React, { useState } from 'react'
import { indexBy, prop } from 'ramda'
import './Board.css'
import { board as newBoard } from './data'
import { Swimlane } from './Swimlane'

const byId = prop('id')
const indexBoard = board => ({
  ...board,
  swimlanes: indexBy(byId, board.swimlanes
    .map(sl => ({ ...sl,
      stages: indexBy(byId, sl.stages
        .map(st => ({ ...st, cards: indexBy(byId, st.cards)
        })))
    })))
})
const indexedBoard = indexBoard(newBoard)

export default function Board () {
  const [board, setBoard] = useState(indexedBoard)
  const moveCard = (source, target) => {
    board.swimlanes[target.swimlaneId].stages[target.stageId].cards[source.card.id] = source.card
    delete board.swimlanes[source.ctx.swimlaneId].stages[source.ctx.stageId].cards[source.card.id]
    setBoard(board)
  }

  return (
    <div className='Board'>
      {
        Object.values(board.swimlanes).map(sl =>
          <Swimlane
            key={sl.id}
            swimlane={sl}
            moveCard={moveCard}>
          </Swimlane>)
      }
    </div>
  )
}
