import { ReactNode, createContext, useState } from "react";
import { Link, MainData, Profile } from "../lib/types";

const initialUser: MainData = {
  image: "",
  firstName: "",
  lastName: "",
  email: "email@example.com",
};

type ProfileContextType = {
  profile: Profile;
  addLink: (link: Link) => void;
  editLink: (linkId: string, newLink: Link) => void;
  removeLink: (linkId: string) => void;
  editMainData: (newMainData: MainData) => void;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    id: "firstuser",
    userData: initialUser,
    userLinks: [],
  });

  const addLink = (link: Link) => {
    setProfile((prevProfile: Profile) => ({
      ...prevProfile,
      userLinks: [...prevProfile.userLinks, link],
    }));
  };

  const editLink = (linkId: string, newLink: Link) => {
    setProfile((prevProfile: Profile) => ({
      ...prevProfile,
      userLinks: prevProfile.userLinks.map((link) =>
        link.id === linkId ? newLink : link
      ),
    }));
  };

  const removeLink = (linkId: string) => {
    setProfile((prevProfile: Profile) => ({
      ...prevProfile,
      userLinks: prevProfile.userLinks.filter((link) => link.id !== linkId),
    }));
  };

  const editMainData = (newMainData: MainData) => {
    setProfile((prevProfile: Profile) => ({
      ...prevProfile,
      userData: newMainData,
    }));
  };

  return (
    <ProfileContext.Provider
      value={{ profile, addLink, editLink, removeLink, editMainData }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
