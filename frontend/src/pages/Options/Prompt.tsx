import { useState } from "react";
import DubstepHeader from "../../partials/DubstepHeader";
import { Spinner, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Prompt: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const toast = useToast();
  const handleSubmit = () => {
    if (prompt.trim() != "") {
      setIsSubmitting(true);
    } else {
      toast({
        variant: "solid",
        title: "prompt cannot be empty.",
        isClosable: true,
        colorScheme: "whiteAlpha",
        position: "top",
      });
      setPrompt("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <DubstepHeader user={null} />
      <main className="flex-grow place-content-center grid grid-cols-1 w-4/5 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-7xl">
            write your prompt and let us do the magic.
          </h1>
          <textarea
            className="w-full h-80 text-4xl my-4 rounded-2xl p-6 outline-0"
            placeholder="type prompt here..."
            disabled={isSubmitting}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="text-4xl rounded-2xl p-6 bg-white w-80 shrink text-ace enabled:hover:bg-black enabled:hover:text-white enabled:transition enabled:duration-200 disabled:opacity-25"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {!isSubmitting ? "create playlist" : <Spinner size={"lg"} />}
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default Prompt;
