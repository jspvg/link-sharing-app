import { useCallback, useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { UserPlatform } from '../lib/types';
import '../styles/components/mockup.scss';
import { fetchUserPlatforms } from '../lib/api/queries';
import LargePlatform from './platform/LargePlatform';

const MobileMockup = () => {
  const { user } = useUser();

  const [userPlatforms, setUserPlatforms] = useState<UserPlatform[]>([]);

  const fetchAndSetUserPlatforms = useCallback(async () => {
    if (user) {
      try {
        const fetchedUserPlatforms = await fetchUserPlatforms(user.id);
        setUserPlatforms(fetchedUserPlatforms);
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchAndSetUserPlatforms();
  }, [fetchAndSetUserPlatforms]);

  return (
    <div className="outline">
      <div className="inline">
        <div className="mobile-header">
          <div className="circle"></div>
          <div className="name"></div>
          <div className="contact"></div>
        </div>
        <div className="mobile-content">
          {Array.from({ length: 5 }).map((_, index) => {
            if (index < userPlatforms.length) {
              return (
                <LargePlatform
                  key={index}
                  userPlatform={userPlatforms[index]}
                  index={index}
                />
              );
            } else {
              return (
                <div className="link-element" key={index}>
                  {/* Render empty link-element as placeholders */}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileMockup;
