import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
 
const Video = () => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const callingVideoRef = useRef<HTMLVideoElement>(null);

  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [myUniqueId, setMyUniqueId] = useState<string>("");
  const [idToCall, setIdToCall] = useState('');

  const generateRandomString = () => Math.random().toString(36).substring(2);

  const handleCall = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      const call = peerInstance?.call(idToCall, stream);
      if (call) {
        call.on('stream', userVideoStream => {
          if (callingVideoRef.current) {
            callingVideoRef.current.srcObject = userVideoStream;
          }
        });
      }
    });
  };

  useEffect(() => {
    if(myUniqueId){
        let peer: Peer;
        if (typeof window !== 'undefined') {
          peer = new Peer(myUniqueId, {
            host: 'localhost',
            port: 9000,
            path: '/myapp',
          });

          setPeerInstance(peer);
    
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          }).then(stream => {
            if (myVideoRef.current) {
              myVideoRef.current.srcObject = stream;
            }

            peer.on('call', call => {
              call.answer(stream);
              call.on('stream', userVideoStream => {
                if (callingVideoRef.current) {
                  callingVideoRef.current.srcObject = userVideoStream;
                }
              });
            });
          });
        }
        return () => {
            if (peer) {
              peer.destroy();
            }
          };
    }
  }, [myUniqueId]);

  useEffect(() => {
    setMyUniqueId(generateRandomString());
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px' }}>
      <p>Your ID: {myUniqueId}</p>
      <video style={{ width: '320px', marginBottom: '24px' }} playsInline ref={myVideoRef} autoPlay />
      <input className='text-black' placeholder="ID to call" value={idToCall} onChange={e => setIdToCall(e.target.value)} style={{ marginBottom: '16px' }} />
      <button onClick={handleCall} style={{ marginBottom: '16px' }}>Call</button>
      <video style={{ width: '320px' }} playsInline ref={callingVideoRef} autoPlay />
    </div>
  );
};

export default Video;
