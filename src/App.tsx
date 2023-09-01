import { useState } from 'react'
import { Comments } from './components'

const comments = [
  {
    id: 1,
    userName: "JP",
    value: "hello",
    comments: [{
      id: 11,
      userName: "AAAA",
      value: "hi there",
      comments: [
        {
          id: 22,
          userName: "XYZ",
          value: "all good",
          comments: [
            {
              id: 33,
              userName: "ABC",
              value: "how's your day",
              comments: []
            }
          ]
        }
      ]
    },
    {
      id: 12,
      userName: "ZZ",
      value: "hi there",
      comments: []
    },
    ]
  },
  {
    id: 2,
    userName: "BBBB",
    value: "test",
    comments: [{
      id: 11,
      value: "test1",
      comments: []
    },
    {
      id: 12,
      userName: "ZZ",
      value: "test1",
      comments: [
        {
          id: 22,
          userName: "XYZ",
          value: "test2",
          comments: [
            {
              id: 33,
              userName: "ABC",
              value: "test3",
              comments: []
            }
          ]
        }
      ]
    },
    ]
  }
]

function App() {

  return (
    <>
      <div style={{marginLeft: '100px'}}>
        <div>
          <Comments comments={comments} />
        </div>
      </div>
    </>
  )
}

export default App
