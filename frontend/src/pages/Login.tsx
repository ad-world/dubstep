import { Link } from "react-router-dom";
import DubstepHeader from "../partials/DubstepHeader";
import { motion } from "framer-motion";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { BG_GRADIENT } from "../util/constants";

const Login: React.FC = () => {
  return (
    <Flex height={"100vh"} bgGradient={BG_GRADIENT} minWidth={"100vw"}>
      <DubstepHeader user={null} />
      <Center minW={"100vw"}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Heading textAlign={"center"} mb={5}>
            welcome to dubstep
          </Heading>
          <Link to="http://127.0.0.1:5000/authorize">
            <Button
              h={36}
              w={96}
              fontSize={"3xl"}
              rounded={"2xl"}
              _hover={{ bg: "black", color: "white" }}
            >
              log in with spotify
            </Button>
          </Link>
        </motion.div>
      </Center>
    </Flex>
  );
};

export default Login;
