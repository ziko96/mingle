# random-chat-service

A web chat service similar to Chatroulette and Omegle, allowing users to connect via text and video chat.

## Features

### Core Features
- Real-time chat functionality  
- Video streaming capabilities
- User matchmaking for random connections
- Responsive design for various devices

### Security Features
- JWT authentication
- Content moderation 
- Rate limiting
- XSS protection
- CORS configuration

### Additional Features
- User preferences and matching
- Report system
- Logging and monitoring
- Error handling
- Testing suite

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/random-chat-service.git
   ```

2. Navigate to the project directory:
   ```
   cd random-chat-service
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables.

## Usage

1. Start the server:
   ```
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the chat service.

## Testing

To run the tests, use the following command:
```
npm run test
```

## Project Structure

```
/home/centurion/mingle/random-chat-service/
├── src/
│   ├── client/
│   │   ├── components/
│   │   │   └── VideoChat.tsx       # Missing
│   │   │   └── TextChat.tsx       # Missing
│   ├── server/
│   │   ├── middleware/
│   │   │   └── auth.ts            # Missing
│   │   │   └── contentFilter.ts   # Missing
│   ├── database/
│   │   ├── migrations/            # Missing
│   │   └── seeds/                 # Missing
├── vercel.json                     # Missing
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.