const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const server = http.createServer();

const wss = new WebSocket.Server({ server });

console.log(`Servidor WebSocket escuchando en puerto ${PORT}`);

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    // Enviar el mensaje a todos los demás clientes
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor WebSocket en línea en wss://:${PORT}`);
});