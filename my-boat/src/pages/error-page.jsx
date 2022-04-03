import React from 'react';
import { Typography, Box } from '@mui/material';

const ErrorPage = () => (
  <Box sx={{ pt: 20 }}>
    <Typography color="error" sx={{ textAlign: 'center', fontSize: 60 }}>
      404: Page not found
    </Typography>
  </Box>
);

export default ErrorPage;
