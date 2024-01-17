import { UserPlatform } from '../types';
import { supabase } from './supabase';

export const addUserPlatform = async (userPlatform: UserPlatform) => {
  const { error } = await supabase
    .from('user_platforms')
    .insert({
      user_id: userPlatform.user_id,
      platform_id: userPlatform.platform_id,
      url: userPlatform.url,
    })
    .select();
  if (error) throw error;
};

export const deleteUserPlatform = async ({
  user_id,
  platform_id,
}: {
  user_id: string;
  platform_id: string;
}) => {
  const { error } = await supabase
    .from('user_platforms')
    .delete()
    .eq('user_id', user_id)
    .eq('platform_id', platform_id);

  if (error) throw error;
};

export const addProfilePicture = async (user_id: string, picture: File) => {
  const { error } = await supabase.storage
    .from('profile_pictures')
    .upload('public/' + user_id + '.png', picture, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) throw error;
  else {
    const { error } = await supabase
      .from('user_details')
      .update({ profile_picture: 'public/' + user_id + '.png' })
      .match({ user_id: user_id });
    if (error) throw error;
  }
};
