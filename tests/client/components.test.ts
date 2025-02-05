Sure, here's the contents for the file `/random-chat-service/random-chat-service/tests/client/components.test.ts`:

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '../../src/client/components/Chat';
import VideoStream from '../../src/client/components/VideoStream';
import UserControls from '../../src/client/components/UserControls';

describe('Chat Component', () => {
    test('renders chat interface', () => {
        render(<Chat />);
        expect(screen.getByText(/chat/i)).toBeInTheDocument();
    });

    test('sends a message', () => {
        render(<Chat />);
        const input = screen.getByPlaceholderText(/type a message/i);
        const button = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(button);
        
        expect(screen.getByText(/hello/i)).toBeInTheDocument();
    });
});

describe('VideoStream Component', () => {
    test('renders video stream', () => {
        render(<VideoStream />);
        expect(screen.getByText(/video stream/i)).toBeInTheDocument();
    });
});

describe('UserControls Component', () => {
    test('renders user controls', () => {
        render(<UserControls />);
        expect(screen.getByRole('button', { name: /start video/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /stop video/i })).toBeInTheDocument();
    });
});