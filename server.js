const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor WebSocket iniciado en ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    // Enviar el mensaje a todos los clientes excepto al que lo envió
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