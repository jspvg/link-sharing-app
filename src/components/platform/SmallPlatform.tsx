import { UserPlatformData } from '../../lib/types';

type SmallPlatformProps = {
  userPlatform: UserPlatformData;
  index: number;
  handleRemovePlatform: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SmallPlatform = ({
  userPlatform,
  index,
  handleRemovePlatform,
}: SmallPlatformProps) => {

  return userPlatform ? (
    <div
      className="platform"
      key={index}
      style={{ backgroundColor: `${userPlatform.platforms.color}` }}
    >
      <div>
        <img src={userPlatform.platforms.logo_white} alt="" />
        <p style={{ color: 'white' }}>{userPlatform.platforms.name}</p>
      </div>
      <button
        data-index={index}
        onClick={(event) => handleRemovePlatform(event)}
      >
        x
      </button>
    </div>
  ) : (
    <div className="platform" key={index}>
      {/* Render empty platform elements as placeholders */}
    </div>
  );
};

export default SmallPlatform;
