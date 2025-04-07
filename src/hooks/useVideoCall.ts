// hooks/useVideoCall.ts
import {
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {useRef, useState} from 'react';

export function useVideoCall({localId, remoteId, socket}: any) {
  const [localStream, setLocalStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);
  const pc = useRef<RTCPeerConnection | null>(null);

  const getMedia = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);
    return stream;
  };

  const startCall = async () => {
    const stream = await getMedia();

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach(track => {
      pc.current?.addTrack(track, stream);
    });

    pc.current.ontrack = event => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    pc.current.onicecandidate = event => {
      if (event.candidate) {
        socket.send(
          JSON.stringify({
            type: 'ice-candidate',
            to: remoteId,
            payload: event.candidate,
          }),
        );
      }
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);

    socket.send(
      JSON.stringify({
        type: 'call-offer',
        to: remoteId,
        payload: offer,
      }),
    );
  };

  const receiveOffer = async (offer: any) => {
    const stream = await getMedia();

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach(track => {
      pc.current?.addTrack(track, stream);
    });

    pc.current.ontrack = event => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    pc.current.onicecandidate = event => {
      if (event.candidate) {
        socket.send(
          JSON.stringify({
            type: 'ice-candidate',
            to: remoteId,
            payload: event.candidate,
          }),
        );
      }
    };

    await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);

    socket.send(
      JSON.stringify({
        type: 'call-answer',
        to: remoteId,
        payload: answer,
      }),
    );
  };

  const receiveAnswer = async (answer: any) => {
    if (pc.current) {
      await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const addIceCandidate = async (candidate: any) => {
    if (pc.current) {
      await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return {
    startCall,
    receiveOffer,
    receiveAnswer,
    addIceCandidate,
    localStream,
    remoteStream,
  };
}
