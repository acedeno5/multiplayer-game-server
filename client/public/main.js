(function(){
  const socket = io();
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const scoresDiv = document.getElementById('scores');
  let myId = null;
  let players = {};
  let coins = [];

  socket.on('init', (data) => {
    myId = data.id;
    players = data.players || {};
    coins = data.coins || [];
    draw();
  });

  socket.on('state', (data) => {
    players = data.players || {};
    coins = data.coins || [];
    draw();
    updateLeaderboard();
  });

  socket.on('coins', (data) => {
    coins = data;
    draw();
  });

  function draw(){
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw coins
    for (const coin of coins){
      ctx.beginPath();
      ctx.fillStyle = '#FFD700';
      ctx.arc(coin.x, coin.y, 6, 0, Math.PI*2);
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw players
    for (const id in players){
      const p = players[id];
      ctx.beginPath();
      ctx.fillStyle = p.color || '#fff';
      ctx.arc(p.x, p.y, id===myId?12:8, 0, Math.PI*2);
      ctx.fill();
      ctx.strokeStyle = id===myId ? '#fff' : '#999';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(id===myId? 'You' : id.slice(0,4), p.x, p.y-18);
      
      // Score
      ctx.fillStyle = '#0f0';
      ctx.font = '9px monospace';
      ctx.fillText(p.score || 0, p.x, p.y+20);
    }
  }

  function updateLeaderboard(){
    const sorted = Object.values(players)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    let html = '<strong>Leaderboard:</strong><br>';
    sorted.forEach((p, i) => {
      const label = p.id === myId ? '→ You' : p.id.slice(0,4);
      html += `${i+1}. ${label}: ${p.score}<br>`;
    });
    scoresDiv.innerHTML = html;
  }

  const speed = 5;
  window.addEventListener('keydown', (e) => {
    let dx = 0, dy = 0;
    if (e.key === 'ArrowLeft') dx = -speed;
    if (e.key === 'ArrowRight') dx = speed;
    if (e.key === 'ArrowUp') dy = -speed;
    if (e.key === 'ArrowDown') dy = speed;
    if (dx||dy) socket.emit('move', {dx, dy});
  });

  draw();
})();
