/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, useTheme } from '@mui/material';

import { selectAuth } from '../../store/auth';
import ProfilePageForm from './profile-page-form';

const ProfilePage = () => {
  const {
    user: { imgSrc, ...user },
  } = useSelector(selectAuth);
  const { breakpoints, mixins, spacing } = useTheme();

  const containerWidth =
    breakpoints.values.lg -
    mixins.drawer.width -
    Number(spacing(6).slice(0, -2));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, sm: 5 },
        width: { lg: containerWidth },
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
    >
      <Typography component="h1" variant="h5" >
        Profile information
      </Typography>
      <Box sx={{ width: '100%' }}>
        <ProfilePageForm {...user} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
