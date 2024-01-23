import { UserDetails, UserPlatform } from '../types';
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
  const filePath = 'public/' + user_id + '.png';
  const { error: uploadError } = await supabase.storage
    .from('profile_pictures')
    .upload(filePath, picture, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const referenceFilePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/profile_pictures/${filePath}`;
  const { error: insertError } = await supabase
    .from('user_details')
    .insert([{ user_id: user_id, profile_picture: referenceFilePath }]);

  if (insertError) throw insertError;
};

export const upsertUserDetails = async (
  user_id: string,
  userDetails: Partial<UserDetails>,
  picture?: File | null,
) => {
  let profile_picture: string | null = null;
  if (picture) {
    const filePath = `public/${user_id}.png`;
    const { error: uploadError } = await supabase.storage
      .from('profile_pictures')
      .upload(filePath, picture, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;
    profile_picture = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/profile_pictures/${filePath}`;
  }

  const data = { ...userDetails, profile_picture };
  const { error: updateError } = await supabase
    .from('user_details')
    .update(data)
    .eq('user_id', user_id);

  if (updateError) {
    const { error: insertError } = await supabase
      .from('user_details')
      .insert([{ user_id, ...data }]);

    if (insertError) throw insertError;
  }

  if (userDetails.email) {
    const { error: updateAuthError } = await supabase.auth.updateUser({
      email: userDetails.email,
    });

    if (updateAuthError) throw updateAuthError;
  }
};
