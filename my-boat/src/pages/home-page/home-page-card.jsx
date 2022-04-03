/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';

const HomePageCard = ({ theme, title, url, buttonTitle, width }) => {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{
          mt: '600px',
          width: { width },
          height: '200px',
          mb: '25px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.secondary.light,
        }}
        elevation={5}
      >
        <Typography variant="h4" gutterBottom component="div">
          {title}
        </Typography>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: 140,
            height: 40,
            fontSize: 16,
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#f5f5f5',
              color: theme.palette.primary.main,
            },
          }}
          variant="contained"
          onClick={() => navigate(url)}
        >
          {buttonTitle}
        </Button>
      </Paper>
    </>
  );
};

export default HomePageCard;
