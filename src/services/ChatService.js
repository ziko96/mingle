"use strict";
exports.__esModule = true;
exports.ChatService = void 0;
var ChatService = /** @class */ (function () {
    function ChatService(socket, roomManager) {
        this.socket = socket;
        this.roomManager = roomManager;
    }
    return ChatService;
}());
exports.ChatService = ChatService;
