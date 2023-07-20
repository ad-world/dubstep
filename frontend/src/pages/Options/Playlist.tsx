import { useEffect, useState } from "react";
import DubstepHeader from "../../partials/DubstepHeader";
import { motion } from "framer-motion";
import { SpotifyPlaylist } from "../../types/spotify";
import { getPlaylists } from "../../util/API";
import { StatusResponse } from "../../types/api";
import { Link } from "react-router-dom";

const defaultImage =
  "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png";

interface PlaylistBoxProps {
  playlist: SpotifyPlaylist;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({ playlist }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Link to={`/playlist?playlist=${playlist.id}`}>
        <div className="bg-white rounded-xl p-6 text-center drop-shadow-sm hover:drop-shadow-xl hover:bg-purple-300 transition duration-300 hover:cursor-pointer">
          <img
            className="mb-4 mx-auto"
            src={playlist.images.length ? playlist.images[0].url : defaultImage}
            width="200"
            height="200"
          ></img>
          <h3 className="font-bold">{playlist.name}</h3>
          <h4 className="">{playlist.owner.display_name}</h4>
        </div>
      </Link>
    </motion.div>
  );
};

const Playlist: React.FC = () => {
  const [playlists, setPlaylists] = useState<Array<SpotifyPlaylist>>([]);
  const [noPlaylistsError, setNoPlaylistsError] = useState<boolean>(false);

  useEffect(() => {
    const populate = async () => {
      const data = await getPlaylists();
      if (data.status == StatusResponse.Success) {
        if (data.data.items.length == 0) {
          setNoPlaylistsError(true);
        } else {
          setPlaylists(data.data.items);
        }
      } else {
        if (data.status == StatusResponse.Failure && data.data == null) {
          setNoPlaylistsError(true);
        }
      }
    };

    populate();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <DubstepHeader user={null} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <main className="flex my-10 place-content-center grid grid-cols-1 w-4/5 mx-auto ">
          <h1 className="text-7xl mx-auto text-gray-800">
            pick a playlist to use as inspo
          </h1>
          <div className="flex-grow grid grid-cols-1 mx-auto gap-20 mt-10 lg:grid-cols-3 md:grid-cols-2">
            {!playlists && (
              <>
                <div />
                <div />
                <div />
              </>
            )}
            {playlists.map((item) => {
              return <PlaylistBox key={item.id} playlist={item} />;
            })}
          </div>
          {noPlaylistsError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-3xl mx-auto text-center">
                it looks like you don't have any playlists - maybe go back to
                the options and generate based on prompt or genres!
              </h3>
            </motion.div>
          )}
        </main>
      </motion.div>
    </div>
  );
};

export default Playlist;
