export type Platform = {
  platform_id: string;
  name: string;
  logo_gray: string;
  logo_white: string;
  color: string;
};

export type UserPlatform = Platform & {
  user_id: string;
  platform_id: string;
  url: string;
};

export type UserPlatformData = UserPlatform & {
  platforms: Platform[];
};

export type Link = {
  id: string;
  platform: Platform;
  link: string;
};

export type MainData = {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Profile = {
  id: string;
  userData: MainData;
  userLinks: Link[];
};
