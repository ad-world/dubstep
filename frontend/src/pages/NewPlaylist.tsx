import {  motion } from "framer-motion";
import DubstepHeader from "../partials/DubstepHeader";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecommendations } from "../util/API";
import { SpotifyRecommendationResponse, SpotifyTrack } from "../types/spotify";
import {
  Box,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { formatDuration } from "../util/functions";

interface TrackBoxProps {
  track: SpotifyTrack;
}

const TrackBox: React.FC<TrackBoxProps> = ({ track }) => {
  const trackArtists = track.artists.map((item) => item.name).join(", ");
  return (
    <Box w="100">
      <Divider colorScheme={"black"} />
      <HStack justifyContent={"space-between"}>
        <Text fontSize={36} my={4}>
          <span style={{ fontWeight: "700" }}>{track.name}</span> by{" "}
          {trackArtists}
        </Text>
        <Text fontWeight={700} fontSize={36}>
          {formatDuration(track.duration_ms)}
        </Text>
      </HStack>
    </Box>
  );
};

const NewPlaylist: React.FC = () => {
  const [songs, setSongs] = useState<SpotifyRecommendationResponse | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newName, setNewName] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, _] = useSearchParams();
  const toast = useToast();

  const populate = useCallback(
    async (playlist_id: string) => {
      const data = await getRecommendations(playlist_id);
      if (data && songs == null) {
        setSongs(data.data);
      }
    },
    [songs]
  );

  const createNewPlaylist = async () => {
    if (newName == null || newName.trim() == "") {
      toast({
        title: "new name cannot be empty",
        description:
          "please do this for us. we are working on automating this process with ai.",
        colorScheme: "red",
        position: "top",
        variant: "subtle",
        isClosable: true,
      });
      return;
    }
    setIsSubmitting(true);

    // const res = await createPlaylistFromPlaylist({
    //   tracks: songs?.tracks ?? [],
    // });
  };

  useEffect(() => {
    if (params.get("playlist")) {
      populate(params.get("playlist") || "");
    }
  }, [params, populate]);
  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="300px" maxWidth="1280px" rounded={"3xl"}>
          <h1 className="text-7xl ml-10 mt-10">
            give your new playlist a name
          </h1>
          <ModalBody>
            <textarea
              className="w-full h-80 text-4xl my-4 rounded-2xl p-6 outline-0"
              placeholder="type name here..."
              disabled={isSubmitting}
              value={newName ?? ""}
              onChange={(e) => setNewName(e.target.value)}
            ></textarea>
          </ModalBody>
          <ModalFooter>
            <button
              className="text-2xl rounded-2xl p-6 bg-white w-80 shrink text-ace enabled:hover:bg-black enabled:hover:text-white enabled:transition enabled:duration-200 disabled:opacity-25 mr-4"
              onClick={createNewPlaylist}
              disabled={isSubmitting}
            >
              {!isSubmitting ? "confirm & add" : <Spinner size={"lg"} />}
            </button>
            <button
              className="text-2xl rounded-2xl p-6 bg-white w-80 shrink text-ace enabled:hover:bg-red-400 enabled:hover:text-white enabled:transition enabled:duration-200 disabled:opacity-25"
              onClick={() => {
                setNewName(null);
                onClose();
              }}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DubstepHeader user={null} />
      <main className="flex-grow grid grid-cols-1 w-3/5 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-7xl mt-16 mb-8">
            {songs ? "here's your new playlist" : "generating..."}
          </h1>

          {songs && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {songs.tracks.map((item) => (
                <TrackBox key={item.id} track={item}></TrackBox>
              ))}
              <button
                className="text-4xl rounded-2xl p-6 bg-white w-80 shrink text-ace enabled:hover:bg-black enabled:hover:text-white enabled:transition enabled:duration-200 disabled:opacity-25 mt-10 mb-20"
                onClick={onOpen}
                disabled={isSubmitting}
              >
                add playlist to spotify
              </button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default NewPlaylist;
