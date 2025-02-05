"use strict";
exports.__esModule = true;
var ChatController = /** @class */ (function () {
    function ChatController() {
        this.messages = [];
    }
    ChatController.prototype.sendMessage = function (user, message) {
        this.messages.push({ user: user, message: message });
        this.broadcastMessage(user, message);
    };
    ChatController.prototype.getMessages = function () {
        return this.messages;
    };
    ChatController.prototype.broadcastMessage = function (user, message) {
        // Logic to broadcast the message to all connected clients
    };
    return ChatController;
}());
exports["default"] = ChatController;
