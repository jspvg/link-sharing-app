import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/api/supabase';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    })();
  }, []);

  return { user, loading };
};

export default useUser;
