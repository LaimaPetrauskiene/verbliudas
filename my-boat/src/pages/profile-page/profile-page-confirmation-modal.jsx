/* eslint-disable */

import React, { useState } from 'react';
import {
  Paper,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  styled,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import UserService from '../../services/user-service';

const Form = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: theme.spacing(3),
}));

const ProfilePageConfimationModal = ({ open, handleClose, formData }) => {
  const [error, setError] = useState(undefined);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    if (error) setError(undefined);
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await UserService.updateProfile({
      ...formData,
      password,
    });
    if (result) {
      handleClose();
      setPassword('');
    } else {
      setError('Password is incorrect!');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Form
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
        onSubmit={handleSubmit}
      >
        <LockIcon fontSize="large" color="primary" />
        <Typography variant="h5">Enter password</Typography>
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          error={Boolean(error)}
          helperText={error && error}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit" size="large">Submit</Button>
        </Box>
      </Form>
    </Modal>
  );
};

export default ProfilePageConfimationModal;
