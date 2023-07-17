import { motion } from "framer-motion";
import DubstepHeader from "../partials/DubstepHeader";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecommendations } from "../API";
import { SpotifyRecommendationResponse, SpotifyTrack } from "../types/spotify";
import { Box, Divider, Text } from "@chakra-ui/react";

interface TrackBoxProps {
  track: SpotifyTrack;
}

const TrackBox: React.FC<TrackBoxProps> = ({ track }) => {
  return (
    <Box w="100">
      <Divider colorScheme={"black"} />
      <Text size="sm" my={4}>
        {track.name}
      </Text>
    </Box>
  );
};

const NewPlaylist: React.FC = () => {
  const [songs, setSongs] = useState<SpotifyRecommendationResponse | null>(
    null
  );
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, _] = useSearchParams();

  const populate = useCallback(
    async (playlist_id: string) => {
      const data = await getRecommendations(playlist_id);
      if (data && songs == null) {
        setSongs(data.data);
      }
    },
    [songs]
  );

  useEffect(() => {
    if (params.get("playlist")) {
      populate(params.get("playlist") || "");
    }
  }, [params, populate]);
  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
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
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default NewPlaylist;
