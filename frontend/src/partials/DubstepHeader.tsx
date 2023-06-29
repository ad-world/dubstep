import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
const DubstepHeader: React.FC = () => {
  const location = useLocation();
  const isMainPage =
    location.pathname == "/dashboard" || location.pathname == "/";

  const context = useContext(UserContext);
  const target = context.userid ? "/dashboard" : "/";

  return (
    <header className="fixed w-full z-30 md:bg-opacity-90">
      <div className="w-full mx-auto px-5 sm:px-6">
        <div className="flex justify-between mt-4">
          <Link to={target}>
            <h3>{!isMainPage && <ChevronLeftIcon />} dubstep</h3>
          </Link>
          <h3>Username</h3>
        </div>
      </div>
    </header>
  );
};

export default DubstepHeader;
