import { useState } from "react";
import DubstepHeader from "../../partials/DubstepHeader";

const Prompt: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <DubstepHeader />
      <main className="flex-grow place-content-center grid grid-cols-1 w-4/5 mx-auto">
        <h1 className="text-7xl">write your prompt and let us do the magic.</h1>
        <textarea
          className="w-full h-80 text-4xl my-4 rounded-2xl p-6 outline-0"
          placeholder="type prompt here..."
          disabled={isSubmitting}
        ></textarea>
        <button
          className="text-4xl rounded-2xl p-6 bg-white w-80 shrink text-ace"
          onClick={() => setIsSubmitting(true)}
        >
          {!isSubmitting ? "create playlist" : "loading..."}
        </button>
      </main>
    </div>
  );
};

export default Prompt;
