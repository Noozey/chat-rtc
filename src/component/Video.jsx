import { useEffect, useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useAuth } from "../context/AuthContext";

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

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  console.log(users);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(App_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
        }}
      >
        {users.map((user) => (
          <div>{user.uid}</div>
        ))}
      </div>
    </div>
  );
};

// export const VideoPlayer = ({ user }) => {
//   const ref = useRef();

//   useEffect(() => {
//     user.videoTrack.play(ref.current);
//   }, []);

//   return (
//     <div>
//       Uid: {user.uid}
//       <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
//     </div>
//   );
// };
