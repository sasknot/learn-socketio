const path = require('path')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (message) => {
    console.log('message: ' + message)

    io.emit('chat message', message)
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})