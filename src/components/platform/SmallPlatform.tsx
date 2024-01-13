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
}: SmallPlatformProps) =>
  userPlatform ? (
    <div
      className="platform"
      key={index}
      style={{ backgroundColor: `${userPlatform.color}` }}
    >
      <div>
        <img src={userPlatform.logo_white} alt="" />
        <p style={{ color: 'white' }}>{userPlatform.name}</p>
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

export default SmallPlatform;
