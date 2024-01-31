import { User } from '@supabase/supabase-js';
import { Platform, UserPlatform } from '../../types';
import { deleteUserPlatform, addUserPlatform } from '../mutations';

export type FormData = {
  selectedPlatform: Platform;
  platformUrl: string;
};

export async function removeUserPlatform(
  userPlatforms: UserPlatform[],
  index: number,
  setUserPlatforms: React.Dispatch<React.SetStateAction<UserPlatform[]>>,
) {
  const platformToRemove = userPlatforms[index];

  try {
    await deleteUserPlatform({
      user_id: platformToRemove.user_id,
      platform_id: platformToRemove.platform_id,
    });
  } catch (error) {
    console.error('Failed to delete platform:', error);
    return;
  }

  setUserPlatforms((prevPlatforms) =>
    prevPlatforms.filter((_, i) => i !== index),
  );
}

export function saveUserPlatform(
  data: FormData,
  user: User | null,
  setUserPlatforms: React.Dispatch<React.SetStateAction<UserPlatform[]>>,
) {
  const newUserPlatform: UserPlatform = {
    user_id: user!.id,
    platform_id: data.selectedPlatform.platform_id,
    url: data.platformUrl,
  };

  setUserPlatforms((prevPlatforms) => [...prevPlatforms, newUserPlatform]);

  addUserPlatform(newUserPlatform);
}
