import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { UserDetails, UserPlatform } from '../lib/types';
import { useUser } from '../hooks/useUser';
import { fetchUserDetails, fetchUserPlatforms } from '../lib/api/queries';

type State = {
  picture: File | null;
};

type Action =
  | { type: 'setPicture'; payload: File | null }
  | { type: 'clearState' };

const initialState: State = {
  picture: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setPicture':
      return { ...state, picture: action.payload };
    case 'clearState':
      return initialState;
    default:
      throw new Error();
  }
};

type UserDetailsContextType = {
  userPlatforms: UserPlatform[];
  setUserPlatforms: Dispatch<SetStateAction<UserPlatform[]>>;
  userDetails: UserDetails | null;
  setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const UserDetailsContext = createContext<
  UserDetailsContextType | undefined
>(undefined);

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [userPlatforms, setUserPlatforms] = useState<UserPlatform[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (user) {
      fetchUserPlatforms(user.id)
        .then((fetchedData) => {
          setUserPlatforms(fetchedData);
        })
        .catch((err) => {
          console.error('Error fetching user platforms: ', err);
        });

      fetchUserDetails(user.id)
        .then((fetchedData) => {
          setUserDetails(fetchedData);
        })
        .catch((err) => {
          console.error('Error fetching user details: ', err);
        });
    }
  }, [user]);

  return (
    <UserDetailsContext.Provider
      value={{
        userPlatforms,
        setUserPlatforms,
        userDetails,
        setUserDetails,
        state,
        dispatch,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
