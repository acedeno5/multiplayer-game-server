const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const CLIENT_DIR = path.join(__dirname, '..', '..', 'client', 'public');
app.use(express.static(CLIENT_DIR));

const PORT = process.env.PORT || 3000;

// In-memory game state
const players = {};
let coins = [];
let coinIdCounter = 0;

function randomPos() {
  return { x: Math.floor(Math.random() * 750) + 25, y: Math.floor(Math.random() * 550) + 25 };
}

function spawnCoin() {
  return { id: coinIdCounter++, x: randomPos().x, y: randomPos().y };
}

// Spawn coins every 1.5 seconds
setInterval(() => {
  if (coins.length < 10) {
    coins.push(spawnCoin());
    io.emit('coins', coins);
  }
}, 1500);

// Broadcast game state every ~33ms (30 ticks/second)
setInterval(() => {
  io.emit('state', { players, coins });
}, 33);

io.on('connection', (socket) => {
  console.log('connect', socket.id);
  const pos = randomPos();
  players[socket.id] = {
    id: socket.id,
    x: pos.x,
    y: pos.y,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    score: 0
  };

  // send initial state to new client
  socket.emit('init', { id: socket.id, players, coins });
  io.emit('state', { players, coins });

  socket.on('move', (data) => {
    const p = players[socket.id];
    if (!p) return;
    p.x = Math.max(10, Math.min(790, p.x + (data.dx || 0)));
    p.y = Math.max(10, Math.min(590, p.y + (data.dy || 0)));

    // Collision detection: check if player collects any coins
    coins = coins.filter((coin) => {
      const dist = Math.sqrt((p.x - coin.x) ** 2 + (p.y - coin.y) ** 2);
      if (dist < 16) {
        p.score += 10;
        console.log(`${socket.id} collected coin! Score: ${p.score}`);
        return false; // remove coin
      }
      return true;
    });

    io.emit('state', { players, coins });
  });

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
    delete players[socket.id];
    io.emit('state', { players, coins });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Game loop: 30 ticks/sec, coin spawning every 1.5s');
});
