import React, { useEffect, useRef } from 'react';

const VideoStream: React.FC<{ stream: MediaStream | null }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="video-stream">
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default VideoStream;