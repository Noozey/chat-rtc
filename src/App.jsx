import { Auth } from "./component/Auth";
import { VideoRoomJoinUI } from "./component/Video";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="auth-container">
        <Auth />
      </div>
    );
  }

  return <VideoRoomJoinUI />;
}

export default App;
