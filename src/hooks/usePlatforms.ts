import { useEffect, useState } from 'react';
import { Platform } from '../lib/types';
import { fetchPlatforms } from '../lib/api/queries';

const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const fetchAndSetPlatforms = async () => {
      try {
        const fetchedPlatforms = await fetchPlatforms();
        setPlatforms(fetchedPlatforms);
      } catch (err) {
        console.error('Data could not be fetched: ', err);
      }
    };
    fetchAndSetPlatforms();
  }, []);

  return platforms;
};

export default usePlatforms;
