import { useEffect, useState } from 'react';
import { Platform, UserPlatform } from '../../lib/types';
import { fetchPlatformData } from '../../lib/api/queries';

type LargePlatformProps = {
  userPlatform: UserPlatform;
  index: number;
};

const LargePlatform = ({ userPlatform, index }: LargePlatformProps) => {
  const [platform, setPlatform] = useState<Platform>();

  useEffect(() => {
    const getPlatformData = async () => {
      if (!userPlatform) {
        return;
      }
      try {
        const platformData = await fetchPlatformData(userPlatform.platform_id);
        setPlatform(platformData);
      } catch (err) {
        console.error(err);
      }
    };

    getPlatformData();
  }, [userPlatform]);

  if (!userPlatform || !platform) {
    return (
      <div className="link-element" key={index}>
        {/* Render empty link-element as placeholders */}
      </div>
    );
  }

  return (
    <div
      className="link-element"
      key={index}
      style={{ backgroundColor: `${platform.color}` }}
    >
      <div>
        <img src={`${platform.logo_white}`} alt="" />
        <p style={{ color: 'white' }}>{platform.name}</p>
      </div>
    </div>
  );
};

export default LargePlatform;
