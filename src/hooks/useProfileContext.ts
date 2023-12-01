import { useContext } from "react";
import { ProfileContext } from "../store/ProfileContext";

const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider"
    );
  }

  return context;
};

export default useProfileContext;
