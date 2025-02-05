class ChatController {
    private messages: { user: string; message: string }[] = [];

    public sendMessage(user: string, message: string): void {
        this.messages.push({ user, message });
        this.broadcastMessage(user, message);
    }

    public getMessages(): { user: string; message: string }[] {
        return this.messages;
    }

    private broadcastMessage(user: string, message: string): void {
        // Logic to broadcast the message to all connected clients
    }
}

export default ChatController;