import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useUserDetails } from '../hooks/useUserDetails';
import '../styles/components/mockup.scss';
import LargePlatform from './platform/LargePlatform';
import { fetchUserDetails, fetchUserPlatforms } from '../lib/api/queries';

const MobileMockup = ({ userId }: { userId?: string }) => {
  const { user } = useUser();
  const { userPlatforms, setUserPlatforms, userDetails, setUserDetails } =
    useUserDetails();

  useEffect(() => {
    const id = userId || user?.id;
    if (id) {
      fetchUserPlatforms(id).then(setUserPlatforms).catch(console.error);
      fetchUserDetails(id).then(setUserDetails).catch(console.error);
    }
  }, [user, userId, setUserDetails, setUserPlatforms]);

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
              <img
                className="profile-picture"
                src={`${userDetails.profile_picture}?${Date.now()}`}
                alt="Profile"
                key={userDetails?.profile_picture}
              />
            )}
          </div>
          {userDetails?.f_name && userDetails.l_name ? (
            <p>
              {userDetails.f_name} {userDetails.l_name}
            </p>
          ) : (
            <div className="name"></div>
          )}
          {userDetails?.email || user?.email ? (
            <p>{userDetails?.email ?? user?.email}</p>
          ) : (
            <div className="contact"></div>
          )}
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
