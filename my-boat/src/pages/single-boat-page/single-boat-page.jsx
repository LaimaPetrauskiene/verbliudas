import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIService from '../../services/api-service';
import SingleBoatPageCard from './single-boat-page-card';

const SingleBoatPage = () => {
  const { id } = useParams();
  const [boat, setBoat] = useState({});

  useEffect(() => {
    (async () => {
      const fetchedBoat = await APIService.fetchFormatedBoat(id);
      setBoat(fetchedBoat);
    })();
  }, []);

  return (
    <SingleBoatPageCard
      id={boat.id}
      title={boat.title}
      place={boat.place}
      price={boat.price}
      type={boat.type}
      img={boat.img}
    />
  );
};

export default SingleBoatPage;
