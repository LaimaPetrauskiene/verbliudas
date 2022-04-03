import React from "react";
import SquareContainer from "../../components/containers/square-container";

const SingleBoatPageImage = ({ img }) => (
  <SquareContainer>
    <img src={img} alt="#" style={{borderRadius: '10%'}} />
  </SquareContainer>
);

export default SingleBoatPageImage;
