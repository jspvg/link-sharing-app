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

export type UserDetails = {
  user_id: string;
  f_name?: string;
  l_name?: string;
  profile_picture?: string;
  email?: string;
};
