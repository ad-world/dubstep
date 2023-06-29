import { useEffect, useState } from "react";
import DubstepHeader from "../../partials/DubstepHeader";
import { cookieStorageManager } from "@chakra-ui/react";

interface PlaylistBoxProps {
  name: string;
  image: string;
}

const samplePlaylists = [
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p1",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
  {
    name: "p2",
    image:
      "https://i.pinimg.com/originals/d7/c0/8b/d7c08ba221d859444203bf72e969a95a.png",
  },
];

const PlaylistBox: React.FC<PlaylistBoxProps> = ({ name, image }) => {
  return (
    <div className="w-full h-full bg-white flex-col rounded-xl p-6">
      <img className="mb-4" src={image} width="200" height="200"></img>
      <h3 className="font-bold">{name}</h3>
    </div>
  );
};

const Playlist: React.FC = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const url = "http://127.0.0.1:5000";
      const data = await fetch(url + "/playlists", {
        credentials: "include",
      });
      const res = await data.json();

      console.log(res);
    };

    getPlaylists();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.jpeg')] bg-cover">
      <DubstepHeader />
      <main className="flex my-10 place-content-center grid grid-cols-1 w-4/5 mx-auto ">
        <h1 className="text-7xl mx-auto text-gray-800">
          pick a playlist to use as inspo
        </h1>
        <div className="flex-grow grid grid-cols-1 mx-auto gap-20 mt-10 lg:grid-cols-3 md:grid-cols-2">
          {samplePlaylists.map((item) => {
            return <PlaylistBox name={item.name} image={item.image} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default Playlist;
