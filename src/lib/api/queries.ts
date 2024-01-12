import { supabase } from './supabase';

export const fetchPlatforms = async () => {
  const { data, error } = await supabase.from('platforms').select('*');
  if (error) throw error;
  return data;
};
