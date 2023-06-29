import { Link } from "react-router-dom";
import DubstepHeader from "../partials/DubstepHeader";

interface GenerationChoiceProps {
  text: string;
  url: string;
}

const GenerationChoice: React.FC<GenerationChoiceProps> = ({ text, url }) => {
  return (
    <Link to={url}>
      <div className="w-100 bg-white rounded-2xl my-4 p-6 hover:bg-black hover:text-white transition duration-300 ease-in-out">
        <h1 className="text-6xl">{text}</h1>
      </div>
    </Link>
  );
};

const Dubstep: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <DubstepHeader />
      <main className="flex-grow place-content-center grid grid-cols-1 w-4/5 mx-auto">
        <h1 className="text-7xl">how would you like to generate a playlist?</h1>
        <GenerationChoice
          text="use an existing playlist"
          url="/options/playlist"
        />
        <GenerationChoice
          text="write a meaningful prompt"
          url="/options/prompt"
        />
        <GenerationChoice
          text="pick a few moods and genres"
          url="/options/prompt"
        />
      </main>
    </div>
  );
};

export default Dubstep;
