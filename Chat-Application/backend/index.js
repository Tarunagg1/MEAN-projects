const express = require('express');
const app = express();
const http = require('http').createServer(app);


app.get('/', (req, res) => {
    return res.send("ihuh")
});



http.listen(3000, () => {
    console.log('server listning on 3000');
})


// socket code

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ['GET', 'POST'],
    },
});


io.on('connection', (socket) => {
    console.log('connection on socket');

    socket.on('message', (message) => {
        socket.broadcast.emit('message-broadcast', message);
    })
})




