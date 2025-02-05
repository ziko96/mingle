"use strict";
exports.__esModule = true;
exports.setupWebSocket = void 0;
var socket_io_1 = require("socket.io");
var handleConnection = function (socket) {
    console.log('User connected:', socket.id);
    socket.on('disconnect', function () {
        console.log('User disconnected:', socket.id);
    });
    socket.on('message', function (message) {
        console.log('Message received:', message);
        // Handle message logic here
        socket.broadcast.emit('message', message);
    });
};
var setupWebSocket = function (server) {
    var io = new socket_io_1.Server(server);
    io.on('connection', handleConnection);
};
exports.setupWebSocket = setupWebSocket;
