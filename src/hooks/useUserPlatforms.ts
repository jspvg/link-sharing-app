import { useEffect, useState } from 'react';
import { UserPlatform } from '../lib/types';
import { fetchUserPlatforms } from '../lib/api/queries';
import { useUser } from './useUser';

const useUserPlatforms = () => {
  const { user } = useUser();
  const [userPlatforms, setUserPlatforms] = useState<UserPlatform[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserPlatforms(user.id)
        .then((fetchedData) => {
          setUserPlatforms(fetchedData);
        })
        .catch((err) => {
          console.error('Error fetching user platforms: ', err);
        });
    }
  }, [user]);

  return { userPlatforms, setUserPlatforms };
};

export default useUserPlatforms;
