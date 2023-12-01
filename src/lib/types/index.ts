export type Platform = {
  id: number;
  name: string;
  logo: string;
  color: string;
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
