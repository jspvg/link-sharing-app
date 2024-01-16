export type Platform = {
  platform_id: string;
  name: string;
  logo_gray: string;
  logo_white: string;
  color: string;
};

export type UserPlatform = {
  user_id: string;
  platform_id: string;
  url: string;
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
