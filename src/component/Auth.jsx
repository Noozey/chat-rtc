import { auth, provider, data } from "../firebase-setting";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

export const Auth = () => {
  const singInWithGoodle = async () => {
    try {
      const loginData = await signInWithPopup(auth, provider);
      const userRef = doc(data, "users", loginData.user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) return;

      await setDoc(userRef, {
        id: loginData.user.uid,
        name: loginData.user.displayName,
        email: loginData.user.email,
        image: loginData.user.photoURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-700 min-h-screen flex items-center justify-center inter px-4">
      <div className="bg-gray-300 border h-[500px] w-full max-w-[750px] rounded-sm shadow-cyan-500/50">
        <div className="border-b border-slate-400 h-14 flex items-center text-2xl px-4 font-bold text-gray-800">
          Lets-Chat
        </div>

        <div className="flex flex-col justify-center items-center pt-3 gap-4">
          <h1 className="font-bold text-xl sm:text-2xl text-center">
            Create your Lets-Chat account
          </h1>
          <span className="flex flex-wrap gap-1 text-center">
            Already have an account?
            <a href="#" className="border-b border-black font-bold">
              Log in
            </a>
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8 px-6 sm:px-16">
          <div className="w-full max-w-[400px]">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Enter your Name:
            </label>
            <input
              id="name"
              className="rounded-lg w-full h-10 px-4 border border-gray-300 focus:outline-none focus:ring focus:ring-cyan-500"
              placeholder="Your Name"
            />
          </div>

          <button className="w-full max-w-[400px] py-2 border border-gray-500 rounded-3xl bg-gray-300 hover:bg-gray-400 transition-all">
            Next
          </button>

          <span className="text-sm">or login with</span>

          <button
            onClick={singInWithGoodle}
            className="w-full max-w-[400px] h-12 flex justify-center items-center border border-gray-500 rounded-3xl hover:bg-gray-400 transition-all"
          >
            <img
              src="https://imgs.search.brave.com/Rc5-9CCuWTHVkm2-9DSRTd1eHR8lllvLGMDItcTTPzY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3ZpdGUvYXNz/ZXRzL2dvb2dsZS1E/aWNqVVF2QS5zdmc"
              width={24}
              alt="Google"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
