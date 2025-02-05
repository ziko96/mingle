"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var react_1 = require("react");
var Chat = function () {
    var _a = (0, react_1.useState)([]), messages = _a[0], setMessages = _a[1];
    var _b = (0, react_1.useState)(''), input = _b[0], setInput = _b[1];
    var sendMessage = function () {
        if (input.trim()) {
            setMessages(__spreadArray(__spreadArray([], messages, true), [input], false));
            setInput('');
        }
    };
    (0, react_1.useEffect)(function () {
        // Logic to receive messages from the server would go here
    }, []);
    return (<div className="chat-container">
            <div className="messages">
                {messages.map(function (msg, index) { return (<div key={index} className="message">{msg}</div>); })}
            </div>
            <input type="text" value={input} onChange={function (e) { return setInput(e.target.value); }} placeholder="Type a message..."/>
            <button onClick={sendMessage}>Send</button>
        </div>);
};
exports["default"] = Chat;
