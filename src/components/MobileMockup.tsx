import { useEffect, useState } from 'react';
import { UserDetails, UserPlatform } from '../lib/types';
import '../styles/components/mockup.scss';
import LargePlatform from './platform/LargePlatform';
import useUser from '../hooks/useUser';
import { fetchUserDetails } from '../lib/api/queries';

const MobileMockup = ({ userPlatforms }: { userPlatforms: UserPlatform[] }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const user_id = user.id;
      fetchUserDetails(user_id).then(setUserDetails).catch(console.error);
    }
  }, [user]);

  if (!userPlatforms) {
    return (
      <div className="link-element" key={Math.random()}>
        {/* Render empty link-element as placeholders */}
      </div>
    );
  }
  return (
    <div className="outline">
      <div className="inline">
        <div className="mobile-header">
          <div className="circle">
            {userDetails?.profile_picture && (
              <img className='profile-picture' src={userDetails.profile_picture} alt="Profile" />
            )}
          </div>
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
