import { Link } from "react-router-dom";
import DubstepHeader from "../partials/DubstepHeader";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <DubstepHeader />
      <main className="flex-grow place-content-center grid grid-cols-1 w-3/5 mx-auto">
        <Link to="http://127.0.0.1:5000/authorize">
          <button className="h-36 w-96 bg-black flex items-center gap-2 text-white my-auto mx-auto px-4 py-4 text-3xl rounded-2xl place-content-center hover:bg-white hover:text-black transition duration-200 ease-in-out">
            log in with spotify
            <img src="/spotify.png" height={40} width={40}></img>
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Login;
