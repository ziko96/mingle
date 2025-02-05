"use strict";
exports.__esModule = true;
Sure, here;
's the contents for the file `/random-chat-service/random-chat-service/tests/server/matchmaking.test.ts`:;
var matchmaking_1 = require("../../src/server/services/matchmaking");
var User_1 = require("../../src/server/models/User");
describe('Matchmaking Service', function () {
    var user1;
    var user2;
    beforeEach(function () {
        user1 = new User_1.User('1', 'Alice');
        user2 = new User_1.User('2', 'Bob');
    });
    test('should pair two users correctly', function () {
        var result = (0, matchmaking_1.matchUsers)(user1, user2);
        expect(result).toEqual([user1, user2]);
    });
    test('should return null if no users are available', function () {
        var result = (0, matchmaking_1.matchUsers)(null, null);
        expect(result).toBeNull();
    });
    // Add more tests as needed
});
