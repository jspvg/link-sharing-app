import { UserPlatform } from '../lib/types';
import '../styles/components/mockup.scss';
import LargePlatform from './platform/LargePlatform';

const MobileMockup = ({ userPlatforms }: { userPlatforms: UserPlatform[] }) => {
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
