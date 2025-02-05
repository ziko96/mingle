import { useState, useEffect } from 'react';
import { socket } from '../utils/socket';

export const useWebRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  const servers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: process.env.TURN_SERVER_URL,
        username: process.env.TURN_SERVER_USERNAME,
        credential: process.env.TURN_SERVER_CREDENTIAL
      }
    ]
  };

  useEffect(() => {
    const initializeMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
    };
    initializeMedia();
  }, []);

  return { localStream, remoteStream };
};