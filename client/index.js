import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
  )
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service/service.js', { type: 'module' })
    .then((registration) => {
      console.log('service worker registered')
      console.log(registration)
    })
    .catch((error) => {
      console.log(error.message)
    })
}

Notification.requestPermission()
  .then((permission) => {
    console.log(permission)
  })
  .catch((error) => {
    console.log(error.message)
  })
