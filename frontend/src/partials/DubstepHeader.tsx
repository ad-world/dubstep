import { useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { SpotifyUser } from "../types/spotify";
import { Button } from "@chakra-ui/react";
import { logout } from "../util/API";
import { useNavigate } from "react-router-dom";

interface DubstepHeaderProps {
  user: SpotifyUser | null;
}

const DubstepHeader: React.FC<DubstepHeaderProps> = ({ user }) => {
  const naviagte = useNavigate();
  const location = useLocation();
  const isMainPage =
    location.pathname == "/dashboard" || location.pathname == "/";

  return (
    <header className="fixed w-full z-30 md:bg-opacity-90">
      <div className="w-full mx-auto px-5 sm:px-6">
        <div className="flex justify-between mt-4">
          <Button color="black" variant="link" onClick={() => history.back()}>
            <h3>{!isMainPage && <ChevronLeftIcon />} dubstep</h3>
          </Button>
          <div className="flex justify-between gap-6">
            {user && <h3>{user.display_name}</h3>}
            {user && (
              <Button
                variant="link"
                onClick={() => logout().then(() => naviagte("/"))}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DubstepHeader;
