import { Link, useNavigate } from "react-router-dom";
import DubstepHeader from "../partials/DubstepHeader";
import { useEffect, useState } from "react";
import { getUserInfo, ping } from "../util/API";
import { SpotifyUser } from "../types/spotify";
import { motion } from "framer-motion";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { BG_GRADIENT } from "../util/constants";

interface GenerationChoiceProps {
  text: string;
  url: string;
}

const GenerationChoice: React.FC<GenerationChoiceProps> = ({ text, url }) => {
  return (
    <Link to={url}>
      <Box
        bgColor={"white"}
        rounded={"2xl"}
        my={4}
        p={6}
        _hover={{ bgColor: "black", color: "white" }}
        transition={"ease-in-out"}
        transitionDuration={"300"}
      >
        <Heading fontSize={"6xl"}>{text}</Heading>
      </Box>
    </Link>
  );
};

const Dubstep: React.FC = () => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const session = await ping();

      if (!session.isLoggedIn) {
        navigate("/");
      }

      const spotify = await getUserInfo();
      setUser(spotify);
    };

    getUser();
  }, [navigate]);
  return (
    <Flex height={"100vh"} bgGradient={BG_GRADIENT} minWidth={"100vw"}>
      <DubstepHeader user={user} />
      <Center minWidth={"100vw"}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Heading fontSize={"7xl"}>
            how would you like to generate a playlist?
          </Heading>
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
        </motion.div>
      </Center>
    </Flex>
  );
};

export default Dubstep;
