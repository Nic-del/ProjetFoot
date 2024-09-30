const Socket = require("socket.io");
const express = require("express");
const app = express();
const path = require('path');
const server = require("http").createServer(app);


const PORT = 5000;

const io = Socket(server, {
    // options
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

// Définir le dossier statique pour le client (où se trouve index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Lorsqu'un client se connecte
io.on('connection', (socket) => {
    console.log('Un joueur s\'est connecté :', socket.id);
  
    // Envoyer la position des objets lorsque le client demande une mise à jour
    socket.on('updatePosition', (data) => {
      // Diffuser la position de la balle et des cubes aux autres clients
      socket.broadcast.emit('positionUpdate', data);
    });
  
    // Lorsqu'un client se déconnecte
    socket.on('disconnect', () => {
      console.log('Un joueur s\'est déconnecté :', socket.id);
    });
});

  server.listen(PORT, () => {
    console.log("listening on PORT: ", PORT);
});