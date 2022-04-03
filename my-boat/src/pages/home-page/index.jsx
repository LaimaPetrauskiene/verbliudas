import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import HomePageCard from './home-page-card';
import { selectAuth } from '../../store/auth';

const HomePage = () => {
  const theme = useTheme();
  const { loggedIn } = useSelector(selectAuth);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <HomePageCard
        title="Our suggestions"
        buttonTitle="enter"
        theme={theme}
        url="/boats"
        width={loggedIn ? '100%' : '45%'}
      />
      {!loggedIn ? (
        <HomePageCard
          title="Welcome to the membership!"
          buttonTitle="register"
          theme={theme}
          url="/register"
          width="45%"
        />
      ) : null}
    </Box>
  );
};

export default HomePage;
