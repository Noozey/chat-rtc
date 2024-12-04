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
    <div className="bg-slate-700 h-screen w-screen flex items-center justify-center inter">
      <div className="bg-gray-300 border-[1px h-[500px] w-[750px] rounded-sm shadow-cyan-500/50">
        <div className="border-b border-slate-400 h-14 flex items-center text-2xl p-2 font-bold text-gray-800">
          Lets-Chat
        </div>

        <div className="flex flex-col justify-center items-center pt-3 gap-2">
          <h1 className="font-bold text-2xl">Create your Lets-Chat account</h1>
          <span className="flex gap-1">
            Already have an account?
            <a href="" className="border-b border-black font-bold">
              Log in
            </a>
          </span>
        </div>

        <div className="gap-2">
          <div className="ml-40 flex flex-col gap-5 mt-16">
            <span>
              <h1>Enter your Name:</h1>
              <input className="rounded-lg w-[400px] h-[30px] border-[rgb(182,182,183)] border-2" />
            </span>

            <button className="w-[400px] border-gray-500 border rounded-3xl bg-[#CDCDCC] hover:bg-[#A4A4A3] transition-all">
              Next
            </button>

            <span>or login with</span>

            <button
              onClick={singInWithGoodle}
              className="border border-gray-500  w-[400px] h-[50px] flex justify-center items-center rounded-3xl  hover:bg-[#A4A4A3] transition-all"
            >
              <img
                src="https://imgs.search.brave.com/Rc5-9CCuWTHVkm2-9DSRTd1eHR8lllvLGMDItcTTPzY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3ZpdGUvYXNz/ZXRzL2dvb2dsZS1E/aWNqVVF2QS5zdmc"
                width={35}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
