export const board = {
  id: 'b1',
  title: 'Dev Board',
  swimlanes: [
    {
      id: 'sl1',
      title: 'Standard',
      stages: [
        {
          id: 'st1',
          title: 'Committed',
          cards: [
            {
              id: 'c1',
              title: 'Do thing 1'
            },
            {
              id: 'c2',
              title: 'Do thing 2'
            }
          ]
        },
        {
          id: 'st2',
          title: 'WIP',
          cards: [
            {
              id: 'c3',
              title: 'Do thing 3'
            },
            {
              id: 'c4',
              title: 'Do thing 4'
            }
          ]
        }
      ]
    },
    {
      id: 'sl2',
      title: 'Background',
      stages: [
        {
          id: 'st1',
          title: 'Committed',
          cards: [
            {
              id: 'c5',
              title: 'Do thing 5'
            }
          ]
        },
        {
          id: 'st2',
          title: 'WIP',
          cards: []
        }
      ]
    }
  ]
}
