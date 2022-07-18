const webpush = require('web-push')
const subscription = require('./subscription.json')
const keys = require('./vapidkey.json')

webpush.setVapidDetails('localhost:3000', keys.publicKey, keys.privateKey)

// TODO query database for a list of expiring items and send this with the push notification
webpush.sendNotification(subscription, 'Test push notification')
