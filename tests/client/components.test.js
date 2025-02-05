"use strict";
exports.__esModule = true;
Sure, here;
's the contents for the file `/random-chat-service/random-chat-service/tests/client/components.test.ts`:;
var react_1 = require("@testing-library/react");
describe('Chat Component', function () {
    test('renders chat interface', function () {
        (0, react_1.render)(/>);, expect(react_1.screen.getByText(/chat/i)).toBeInTheDocument());
    });
    test('sends a message', function () {
        (0, react_1.render)(/>););
        var input = react_1.screen.getByPlaceholderText(/type a message/i);
        var button = react_1.screen.getByRole('button', { name: /send/i });
        react_1.fireEvent.change(input, { target: { value: 'Hello' } });
        react_1.fireEvent.click(button);
        expect(react_1.screen.getByText(/hello/i)).toBeInTheDocument();
    });
});
describe('VideoStream Component', function () {
    test('renders video stream', function () {
        (0, react_1.render)(/>);, expect(react_1.screen.getByText(/video stream/i)).toBeInTheDocument());
    });
});
describe('UserControls Component', function () {
    test('renders user controls', function () {
        (0, react_1.render)(/>);, expect(react_1.screen.getByRole('button', { name: /start video/i })).toBeInTheDocument());
        expect(react_1.screen.getByRole('button', { name: /stop video/i })).toBeInTheDocument();
    });
});
