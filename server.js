//SteamVR Social Nodejs server
var io = require('socket.io')(process.env.PORT || 3000);
var playerCount;

console.log('server started');

io.on('connection', function(socket){
    console.log('client connected, broadcasting spawn');

    socket.broadcast.emit('spawn');
    playerCount++;

    for(i=0;i<playerCount;i++){
        socekt.emit('spawn');
        console.log('sending spawn to the new player');
    }

    socket.on('move', function(data) {
        console.log('Player moved',JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });

    socket.on('disconnect', function() {
        console.log('client disconnected');
        playerCount--;
    });
});


