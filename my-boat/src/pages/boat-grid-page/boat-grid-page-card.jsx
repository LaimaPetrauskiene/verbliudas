import React, { useCallback } from 'react';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Fab,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { theme } from '../../styles/theme';

const BoatGridPageCard = ({ title, place, type, price, img, id }) => {
  const navigate = useNavigate();
  const navigateToSingleBoat = useCallback(() => {
    navigate(`/boats/${id}`);
  }, [id]);

  const StyledCardInfo = styled(Typography)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
  }));

  return (
    <Card sx={{ display: 'flex' }} elevation={5}>
      <CardMedia
        sx={{ objectFit: 'contain', width: 250 }}
        component="img"
        height="250"
        image={img}
        alt="#"
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <CardContent sx={{ height: 160 }}>
          <Typography
            title={title}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              fontWeight: 600,
              height: 48,
              mb: '5px',
            }}
          >
            {title}
          </Typography>
          <StyledCardInfo>
            <span>Place: </span>
            <span>{place}</span>
          </StyledCardInfo>
          <StyledCardInfo>
            <span>Type: </span>
            <span>{type}</span>
          </StyledCardInfo>
          <StyledCardInfo>
            <span>Price:</span> <span>{price}</span>
          </StyledCardInfo>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', padding: '16px' }}>
          <Fab
            onClick={navigateToSingleBoat}
            size="small"
            sx={{
              backgroundColor: theme.palette.background.default,
              mr: '10px',
            }}
          >
            <HelpOutlineIcon style={{ fill: theme.palette.primary.light }} />
          </Fab>
        </CardActions>
      </div>
    </Card>
  );
};

export default BoatGridPageCard;
