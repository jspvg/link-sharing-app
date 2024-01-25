import { useContext } from 'react';
import { UserDetailsContext } from '../providers/UserDetailsProvider';

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};
