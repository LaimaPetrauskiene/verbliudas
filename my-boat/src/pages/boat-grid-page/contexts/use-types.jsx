import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIService from '../../../services/api-service';

const useTypes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const setTypeFromUrl = (fetchedTypes) => {
    const typeParam = searchParams.get('type');
    const foundType = fetchedTypes.find((x) => x.id === typeParam);
    const type = foundType ?? fetchedTypes[0];
    if (!foundType) {
      setSearchParams({ type: type.id });
    }
    setSelectedType(type.id);
    setTypes(fetchedTypes);
  };

  const changeType = (id) => {
    setSearchParams({ type: id });
    setSelectedTypes(id);
  };

  useEffect(() => {
    (async () => {
      const typesData = await APIService.fetchTypes();
      const fetchedTypes = typesData.map((x) => ({
        ...x,
      }));
      setTypeFromUrl(fetchedTypes);
    })();
  }, []);

  return {
    types,
    selectedType,
    changeType,
  };
};

export default useTypes;