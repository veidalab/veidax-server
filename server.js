//SteamVR Social Nodejs server
var io = require('socket.io')(process.env.PORT || 3000);
var shortid = require('shortid');

console.log('server started');

var playerCount=0;

io.on('connection', function(socket){
    var thisClientId = shortid.generate();

    console.log('client connected, broadcasting spawn, id:', thisClientId);

    socket.broadcast.emit('spawn', { id: thisClientId });
    playerCount++;

   for(i=0;i<playerCount;i++){
       socket.emit('spawn', { id: thisClientId });
       console.log('sending spawn to connected clients');
   }

    socket.on('move', function(data) {
        data.id = thisClientId;
        console.log('Player moved',JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });

    socket.on('disconnect', function() {
        console.log('client disconnected');
        playerCount--;
    });
});


