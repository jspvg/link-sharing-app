import { UserPlatformData } from '../types';
import { supabase } from './supabase';

export const fetchPlatforms = async () => {
  const { data, error } = await supabase.from('platforms').select('*');
  if (error) throw error;
  return data;
};

export const fetchUserPlatforms = async (
  user_id: string,
): Promise<UserPlatformData[]> => {
  const { data, error } = await supabase
    .from('user_platforms')
    .select('*, platforms(*)')
    .eq('user_id', user_id);
  if (error) throw error;
  return data;
};
