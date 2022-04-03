import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../partials/navbar';
import '../../index.css';

const PageLayout = () => (
  <>
    <Navbar />
    <Container
      element="main"
      sx={{
        py: 3,
      }}
    >
      <Outlet />
    </Container>
  </>
);

export default PageLayout;
