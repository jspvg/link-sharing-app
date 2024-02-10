import { UserDetails, UserPlatform } from '../types';
import { supabase } from './supabase';

export const addUserPlatform = async (userPlatform: UserPlatform) => {
  const { count, error: updateError } = await supabase
    .from('user_platforms')
    .update({ url: userPlatform.url })
    .eq('user_id', userPlatform.user_id)
    .eq('platform_id', userPlatform.platform_id);

  if (updateError) {
    console.error('Update error:', updateError);
    throw updateError;
  }

  console.log('Update count:', count);

  if (!count) {
    const { error: insertError } = await supabase
      .from('user_platforms')
      .insert(userPlatform);

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }
  }
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

export const upsertUserDetails = async (
  user_id: string,
  userDetails: Partial<UserDetails>,
  picture?: File | null,
) => {
  let profile_picture: string | null = null;
  if (picture) {
    const filePath = `public/${user_id}.png`;

    const { error: deleteError } = await supabase.storage
      .from('profile_pictures')
      .remove([filePath]);

    if (deleteError) throw deleteError;

    await new Promise((resolve) => setTimeout(resolve, 1000));

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

  const data = picture ? { ...userDetails, profile_picture } : userDetails;

  const { data: existingUserDetails, error: fetchError } = await supabase
    .from('user_details')
    .select('user_id')
    .eq('user_id', user_id)
    .maybeSingle();

  if (fetchError) throw fetchError;

  if (existingUserDetails) {
    const { error: updateError } = await supabase
      .from('user_details')
      .update(data)
      .eq('user_id', user_id);

    if (updateError) throw updateError;
  } else {
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
