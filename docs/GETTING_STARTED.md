# Getting Started — Real-Time Multiplayer Game

A production-inspired multiplayer demo showcasing real-time networking, game loops, and state synchronization—perfect for demonstrating systems design skills to FAANG recruiters.

## Run Locally

1. Install and start the server:

```bash
cd server
npm install
node src/index.js
```

2. Open a browser to `http://localhost:3000` and open multiple tabs to see multiplayer in action.

3. **How to Play**: Use arrow keys to move. Collect golden coins to earn points. Each coin = +10 points. Watch the leaderboard update in real-time!

---

## 💼 Resume Bullet Points (Copy & Adapt)

Pick 1–3 bullets that fit your background:

### General Software Engineer
- **Developed a real-time multiplayer game server (Node.js + Socket.IO)** with 30 Hz game loop, server-side collision detection, and concurrent player session management for 10+ simultaneous players. Demonstrates low-latency networking, state synchronization, and full-stack architecture.

### Backend / Systems Engineer
- **Built a scalable game server** with event-driven WebSocket architecture, in-memory state management, and server-side validation to prevent client cheating. Showcases concurrency, real-time systems design, and networking protocols (Socket.IO).

### Full-Stack / Frontend Engineer
- **Engineered a multiplayer demo** with Node.js backend and vanilla JavaScript client featuring canvas rendering, keyboard input handling, and Socket.IO messaging. Demonstrates client-server communication, UI rendering under latency, and responsive game mechanics.

### Networking / Systems Design
- **Implemented a tick-based game loop** (30 updates/second) with deterministic collision detection, player state synchronization, and dynamic coin spawning. Shows understanding of real-time constraints, bandwidth optimization, and server-side authority patterns.

---

## 🛠️ Technical Highlights

**Backend** (`server/src/index.js`):
- Express.js + Socket.IO for WebSocket communication
- 30 Hz game loop broadcasting state to all clients
- Collision detection (server-side, prevents cheating)
- Coin spawning logic (random positions, auto-respawn)
- Player session tracking with scoring

**Frontend** (`client/public/main.js`):
- Canvas 2D rendering for smooth, low-latency visuals
- Real-time leaderboard rendering
- Keyboard input debouncing (arrow keys)
- Responsive to network updates from server

**Architecture**:
- Stateful server holds all game state (players, coins, scores)
- Clients send input → server validates → broadcasts new state
- Ready to scale: in-memory state can migrate to Redis for clustering

---

## Key Skills (Reference for Your Resume)

- **Networking**: Low-latency messaging, WebSocket protocol, client-server synchronization
- **Real-time Systems**: Fixed tick rate, game loop patterns, event-driven architecture
- **Concurrency**: Multiple simultaneous connections, state mutations with I/O
- **Security**: Server-side validation (prevent position spoofing, score hacks)
- **Full-Stack**: Backend (Node.js), frontend (vanilla JS + Canvas), DevOps (npm, running locally)

---

## Next Steps to Impress Recruiters

1. **Add Persistance**: Connect a database (MongoDB/PostgreSQL) to save player stats
2. **Add Matchmaking**: Implement a queue system that groups players into separate game instances
3. **Load Testing**: Write a script that spawns 100+ concurrent WebSocket clients to show your server handles scale
4. **Deployment**: Host on AWS/GCP/Azure, provide a live link
5. **Anti-Cheat**: Add server-side checks for impossible moves (e.g., teleporting too far)

Each enhancement is a resume line and conversation starter in interviews.
