import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Grid, Alert, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthForm from '../components/auth-form/auth-form';
import AuthService from '../services/auth-service';
import routes from '../routing/routes';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email is not valid!')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = ({}) => {
  const [searchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async ({ email, password }) => {
    try {
      const redirectTo = searchParams.get('redirectTo');
      await AuthService.login({ email, password }, redirectTo);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <Paper
    sx={{
      width:"400px",
      pb:"20px",
      
    }}>
    <AuthForm
      title="Login"
      linkTo={routes.RegisterPage}
      linkTitle="Don't have an account? Register"
      onSubmit={handleSubmit}
      loading={isSubmitting}
      isValid={dirty && isValid}
    >
      <Grid container spacing={4}>
        {errorMsg ? (
          <Grid item xs={12}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setErrorMsg(null)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {errorMsg}
            </Alert>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            autoFocus
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <TextField
            variant="outlined"
            fullWidth
            label="Password"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            disabled={isSubmitting}
          />
        </Grid>
      </Grid>
    </AuthForm>
    </Paper>
  );
};

export default LoginPage;
