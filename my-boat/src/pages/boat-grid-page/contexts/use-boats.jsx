import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIService from '../../../services/api-service';

const useBoats = () => {
  const [boats, setBoats] = useState([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    (async () => {
      if (searchParams.get('type')) {
        const fetchedBoats = await APIService.fetchFormatedBoats(searchParams);
        setBooks(fetchedBoats);
      }
    })();
  }, [searchParams]);

  return boats;
};

export default useBoats;