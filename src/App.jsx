import { Auth } from "./component/Auth";
import { useAuth } from "./context/AuthContext";
import { VideoRoomJoinUI } from "./component/Video";

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
