//SteamVR Social Nodejs server
var io = require('socket.io')(process.env.PORT || 3000);
var shortid = require('shortid');

console.log('server started');

var players=[];

io.on('connection', function(socket){
    var thePlayerId = shortid.generate();
    
    players.push(thePlayerId);

    console.log('client connected, broadcasting spawn:', { id: thePlayerId });

    io.emit('spawn', { id: thePlayerId });
    io.emit('requestPosition'); 

//    players.forEach(function(playerId){
//        if(playerId == thePlayerId)
//            return;
//
//        socket.emit('spawn', { id: playerId });
//        console.log('sending spawn to connected clients', playerId);
//    });

    socket.on('move', function(data) {
        data.id = thePlayerId;
        console.log('Player moved',JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });
    
    socket.on('updatePosition', function(data) {
        data.id = thePlayerId;
        console.log('update position', data);
        socket.broadcast.emit('updatePosition', data);
    });

    socket.on('disconnect', function() {
        console.log('client disconnected: ', { id: thePlayerId });
        players.splice(players.indexOf(thePlayerId),1);
        socket.broadcast.emit('disconnected',{ id: thePlayerId });
    });
});
