import React from 'react';
import { Box, Typography, Card, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import SingleBoatPageImage from './single-boat-page-card-image';

const SingleBoatPageCard = ({ title, type, price, img }) => {
  const StyledBoxContainer = styled(Card)({
    display: 'flex',
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    backgroundColor: '#f8f8ff',
    padding: 25,
  });

  const StyleImageContainer = styled(Card)({
    height: 250,
    width: 250,
    borderRadius: '10%',
  });

  const StyledInformationItem = styled(Typography)({
    textAlign: 'end',
    fontSize: 16,
    marginBottom: 10,
  });

  const StyledBoatTitle = styled(Typography)({
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20,
  });

  const StyledInformationPrice = styled(StyledInformationItem)({
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  });

  return (
    <Container>
      <StyledBoxContainer>
        <StyleImageContainer>
          <SingleBoatPageImage img={img} sx={{ borderRadius: '10%' }} />
        </StyleImageContainer>
        <Box>
          <StyledBoatTitle sx={{ fontWeight: 'bold' }}>{title}</StyledBoatTitle>
          <StyledInformationItem>Type: {type}</StyledInformationItem>
          <StyledInformationPrice>Price: {price}</StyledInformationPrice>
        </Box>
      </StyledBoxContainer>
    </Container>
  );
};

export default SingleBoatPageCard;
