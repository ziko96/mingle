"use strict";
exports.__esModule = true;
exports.matchUsers = exports.removeUser = exports.addUser = void 0;
var waitingUsers = [];
function addUser(user) {
    waitingUsers.push(user);
}
exports.addUser = addUser;
function removeUser(userId) {
    var index = waitingUsers.findIndex(function (user) { return user.id === userId; });
    if (index !== -1) {
        waitingUsers.splice(index, 1);
    }
}
exports.removeUser = removeUser;
function matchUsers() {
    if (waitingUsers.length < 2) {
        return [null, null];
    }
    var user1 = waitingUsers.shift();
    var user2 = waitingUsers.shift();
    return [user1, user2];
}
exports.matchUsers = matchUsers;
