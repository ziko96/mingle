"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UserControls = function (_a) {
    var onStartVideo = _a.onStartVideo, onStopVideo = _a.onStopVideo, onStartChat = _a.onStartChat, onStopChat = _a.onStopChat;
    return (<div className="user-controls">
            <button onClick={onStartVideo}>Start Video</button>
            <button onClick={onStopVideo}>Stop Video</button>
            <button onClick={onStartChat}>Start Chat</button>
            <button onClick={onStopChat}>Stop Chat</button>
        </div>);
};
exports["default"] = UserControls;
