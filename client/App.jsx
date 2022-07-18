import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './subcomponents/Nav'
import Index from './views/Index'
import Recipes from './views/Recipes'
import ViewProducts from './views/ViewProducts'
import AddProduct from './views/AddProduct'
// const cron = require('node-cron')

function App() {
  // const job = cron.schedule(
  //   '*/30 * * * * *',
  //   () => {
  //     console.log('running a task every minute')
  //     //notifyMe()
  //   },
  //   { schedule: false }
  // )
  //job.start()
  let bool = false
  function noteBool() {
    bool = bool ? false : true
    console.log(bool)
    if (bool === false) {
      //Notification.permission == 'default'
    } else {
      console.log(bool)
      notifyMe()
    }
  }
  function makeNotification() {
    var notification = new Notification('This is a clickable notification', {
      body: 'Click Me',
    })

    notification.onclick = function () {
      window.open('http://localhost:3000/products/add')
    }
  }

  const currentDate = Math.floor(Date.now())

  const options = {
    body: 'heres the time',
    timestamp: currentDate,
  }

  function notifyMe() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      const n = new Notification(
        `Hi there granted!${options.timestamp}`,
        options
      )
      console.log(n)
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission()
        .then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === 'granted') {
            // new Notification('Hi there aaa!')
            makeNotification()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/:ingredient/recipes" element={<Recipes />} />
          <Route path="/products/view" element={<ViewProducts />} />
          <Route path="/products/add" element={<AddProduct />} />
        </Routes>
      </div>
      <div>
        <button onClick={noteBool}>Notify me!</button>
      </div>
    </>
  )
}

export default App
