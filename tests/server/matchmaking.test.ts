Sure, here's the contents for the file `/random-chat-service/random-chat-service/tests/server/matchmaking.test.ts`:

import { matchUsers } from '../../src/server/services/matchmaking';
import { User } from '../../src/server/models/User';

describe('Matchmaking Service', () => {
    let user1: User;
    let user2: User;

    beforeEach(() => {
        user1 = new User('1', 'Alice');
        user2 = new User('2', 'Bob');
    });

    test('should pair two users correctly', () => {
        const result = matchUsers(user1, user2);
        expect(result).toEqual([user1, user2]);
    });

    test('should return null if no users are available', () => {
        const result = matchUsers(null, null);
        expect(result).toBeNull();
    });

    // Add more tests as needed
});