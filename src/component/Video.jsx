import { useEffect, useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useAuth } from "../context/AuthContext";

export const VideoRoomJoinUI = () => {
  const [joined, setJoined] = useState(false);
  const { signUserOut } = useAuth();

  return (
    <>
      <div className=" bg-slate-700">
        <button
          onClick={signUserOut}
          className="w-full h-fit max-w-[100px] py-2 border border-gray-500 rounded-3xl bg-gray-300 hover:bg-gray-400 transition-all"
        >
          Sign Out
        </button>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          {!joined && (
            <div className="flex justify-center items-center flex-col gap-4">
              <h1 className="text-5xl">Join Chat Room</h1>
              <button
                onClick={() => {
                  setJoined(true);
                }}
                className="w-full h-fit max-w-[200px] py-2 border border-gray-500 rounded-3xl bg-gray-300 hover:bg-gray-400 transition-all"
              >
                JoinRoom
              </button>
            </div>
          )}
          {joined && <VideoRoom />}
        </div>
      </div>
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
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((prevUser) => [...prevUser, user]);
    }
    if (mediaType === "audio") {
      user.audioTrack.play;
    }
  };
  const handleUserLeft = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client
      .join(App_ID, CHANNEL, TOKEN, null)
      .then((uid) => {
        return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
      })
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setUsers((prevUser) => [
          ...prevUser,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  return (
    <div className="flex">
      VideoRoom
      {users.map((user) => (
        <VideoPlayer key={user.uid} user={user} />
      ))}
    </div>
  );
};

const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, [user.videoTrack]);
  return (
    <div>
      {user.uid}
      <div ref={ref} className="w-96 h-96"></div>
    </div>
  );
};
