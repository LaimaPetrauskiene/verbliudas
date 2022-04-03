import React from 'react';
import {
  AppBar,
  Container,
  Box,
  Button,
  Zoom,
  Tooltip,
  styled,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { logout, selectAuth } from '../../../store/auth';
import Link from './navbar-link';
import routes from '../../../routing/routes';

import { theme } from '../../../styles/theme';

const Navbar = ({ sidebarIcon }) => {
  const { loggedIn, user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  const StyleAppBar = styled(AppBar)(({ theme }) => ({
    height: 56,
    boxShadow: '0px 6px 4px -1px rgba(0,0,0,0.2)',
    background: theme.palette.primary.main,
  }));

  const StyledMenuBox = styled(Box)(({ theme }) => ({
    display: 'flex',
  }));

  return (
    <StyleAppBar position="sticky" theme={theme}>
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <StyledMenuBox>
          {sidebarIcon ?? null}
          <Link to={routes.HomePage}>Home</Link>

          {user ? <Link to={routes.BoatGridPage}>Boats</Link> : null}
          {user ? <Link to={routes.ProfilePage}>Profile</Link> : null}
          {user && user.role === 'ADMIN' ? (
            <Link to={routes.ManagementPage}>Management panel</Link>
          ) : null}
        </StyledMenuBox>
        <StyledMenuBox>
          {user ? (
            <Link to={routes.Cart}>
              {' '}
              <ShoppingBasketIcon />{' '}
            </Link>
          ) : null}
          {loggedIn ? (
            <Tooltip TransitionComponent={Zoom} title="Logout">
              <Button
                color="primary"
                variant="small"
                sx={{ my: 1 }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            </Tooltip>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Link to={routes.LoginPage}>Login</Link>
              <Link to={routes.RegisterPage}>Register</Link>
            </Box>
          )}
        </StyledMenuBox>
      </Container>
    </StyleAppBar>
  );
};

export default Navbar;
