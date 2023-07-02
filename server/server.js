// Server (Node.js)

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Enable CORS for regular HTTP requests
app.use(cors());

// Socket connection event
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming messages from the client
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(8080, () => {
  console.log('Server started on port 8080');
});
