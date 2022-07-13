import React, { useEffect, useState } from 'react'

import { getFruits } from '../apis/fruits'

function App () {
  const [fruits, setFruits] = useState([])
  useEffect(() => {
    getFruits()
    .then(fruits => {
      setFruits(fruits)
    })
  }, [])

  return (
    <>
      <div className='app'>
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {fruits.map(fruit => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
