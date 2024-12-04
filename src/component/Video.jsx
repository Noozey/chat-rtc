import { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export const VideoRoomJoinUI = () => {
  const [joined, setJoined] = useState(false);

  return (
    <>
      {!joined && (
        <button
          onClick={() => {
            setJoined(true);
          }}
        >
          JoinRoom
        </button>
      )}
      {joined && <VideoRoom />}
    </>
  );
};

const App_ID = "ceb1bedabb974f439c26722f9f6d2b97";
const TOKEN =
  "007eJxTYGCMi5D7vfwZj8SX+wFN5RmnL0bPvmu0NUTD+3BjY9R0/WgFhuTUJMOk1JTEpCRLc5M0E2PLZCMzcyOjNMs0sxQjoFjGF//0hkBGhkrnz8yMDBAI4rMw+CZm5jEwAABobx/2";
const CHANNEL = "Main";
const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const handleUserJoined = () => {};
  const handleUserLeft = () => {};

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client
      .join(App_ID, CHANNEL, TOKEN, null)
      .then((uid) => {
        Promise.all(AgoraRTC.createMicrophoneAndCameraTracks(), uid);
      })
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setUsers((prevUser) => {
          [
            ...prevUser,
            {
              uid,
              videoTrack,
            },
          ];
        });
        client.publish(tracks);
      });
  }, []);

  return (
    <div>
      VideoRoom
      {users.map((user) => {
        <div key={user.uid}>{user.uid}</div>;
      })}
    </div>
  );
};
