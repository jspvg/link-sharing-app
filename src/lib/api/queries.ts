import { Platform, UserDetails, UserPlatform } from '../types';
import { supabase } from './supabase';

export const fetchPlatforms = async () => {
  const { data, error } = await supabase.from('platforms').select('*');
  if (error) throw error;
  return data;
};

export const fetchUserPlatforms = async (
  user_id: string,
): Promise<UserPlatform[]> => {
  const { data, error } = await supabase
    .from('user_platforms')
    .select('*, platforms(*)')
    .eq('user_id', user_id);
  if (error) throw error;
  return data;
};

export const fetchPlatformData = async (
  platform_id: string,
): Promise<Platform> => {
  const { data, error } = await supabase
    .from('platforms')
    .select('*')
    .limit(1)
    .eq('platform_id', platform_id);
  if (error) throw error;
  return data[0];
};

export const fetchUserDetails = async (
  user_id: string,
): Promise<UserDetails> => {
  const { data, error } = await supabase
    .from('user_details')
    .select('*')
    .eq('user_id', user_id);
  if (error) throw error;
  if (data.length === 0) throw new Error('No user found with this user id');
  return data[0];
};
