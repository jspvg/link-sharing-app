import { useEffect, useState } from 'react';
import { Platform, UserPlatform } from '../../lib/types';
import { fetchPlatformData } from '../../lib/api/queries';

type SmallPlatformProps = {
  userPlatform: UserPlatform;
  index: number;
  handleRemovePlatform: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditPlatform: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const SmallPlatform = ({
  userPlatform,
  index,
  handleRemovePlatform,
  handleEditPlatform,
}: SmallPlatformProps) => {
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

  if (!platform) {
    return (
      <div className="platform" key={index}>
        {/* Render empty platform elements as placeholders */}
      </div>
    );
  }

  return (
    <div
      className="platform"
      key={index}
      style={{ backgroundColor: `${platform!.color}` }}
      onClick={(event) => handleEditPlatform(event)}
    >
      <div>
        <img src={platform!.logo_white} alt="" />
        <p style={{ color: 'white' }}>{platform!.name}</p>
      </div>
      <button
        data-index={index}
        onClick={(event) => handleRemovePlatform(event)}
      >
        x
      </button>
    </div>
  );
};

export default SmallPlatform;
