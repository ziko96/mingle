import React from 'react';

const UserControls: React.FC<{ onStartVideo: () => void; onStopVideo: () => void; onStartChat: () => void; onStopChat: () => void; }> = ({ onStartVideo, onStopVideo, onStartChat, onStopChat }) => {
    return (
        <div className="user-controls">
            <button onClick={onStartVideo}>Start Video</button>
            <button onClick={onStopVideo}>Stop Video</button>
            <button onClick={onStartChat}>Start Chat</button>
            <button onClick={onStopChat}>Stop Chat</button>
        </div>
    );
};

export default UserControls;