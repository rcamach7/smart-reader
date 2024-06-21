import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import useAvailableHeight from '@/hooks/useAvailableHeight';

import { Box, TextField, Typography, Button } from '@mui/material';

export default function Login() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const availableHeight = useAvailableHeight();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({ fieldId: '', helperText: '' });
  const { setIsPageLoading } = useLoadingContext();

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.id]:
          e.target.value === 'username'
            ? e.target.value.toLowerCase()
            : e.target.value,
      };
    });
  };

  const handleSignIn = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (credentials.username.length < 4 || credentials.username.length > 15) {
      setErrors({
        fieldId: 'username',
        helperText: 'Must between 4 to 15 characters',
      });
      return;
    } else if (
      credentials.password.length < 4 ||
      credentials.password.length > 20
    ) {
      setErrors({
        fieldId: 'password',
        helperText: 'Must between 4 to 20 characters',
      });
      return;
    }

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/auth/sign-in', credentials);
      setUser(res.data.user);
    } catch (error) {
      const { fieldId, helperText } = error.response.data;
      if (fieldId && helperText) {
        setErrors({ fieldId, helperText });
      }

      console.error(
        helperText ? helperText : 'Error occurred logging in',
        error.response ? error.response : error
      );
    }
    setIsPageLoading(false);
  };

  const handleDemoAccount = async () => {
    const demoCredentials = {
      username: 'demo',
      password: 'demo',
    };
    setCredentials(demoCredentials);

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/auth/sign-in', demoCredentials);
      setUser(res.data.user);
    } catch (error) {
      const { fieldId, helperText } = error.response.data;
      if (fieldId && helperText) {
        setErrors({ fieldId, helperText });
      }

      console.error(
        helperText ? helperText : 'Error occurred logging in',
        error.response ? error.response : error
      );
    }
    setIsPageLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: availableHeight,
          pb: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            borderRadius: 1,
            backgroundColor: '#202833',
            p: 2,
          }}
          component="form"
          onSubmit={handleSignIn}
        >
          <Typography variant="h1" textAlign="center">
            Sign In
          </Typography>
          <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            value={credentials.username}
            onChange={handleCredentialsChange}
            error={errors.fieldId === 'username' ? true : false}
            helperText={errors.fieldId === 'username' ? errors.helperText : ''}
            InputLabelProps={{
              sx: {
                color: '#a5a5a5',
              },
            }}
          />
          <TextField
            required
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={credentials.password}
            onChange={handleCredentialsChange}
            error={errors.fieldId === 'password' ? true : false}
            helperText={errors.fieldId === 'password' ? errors.helperText : ''}
            InputLabelProps={{
              sx: {
                color: '#a5a5a5',
              },
            }}
          />
          {errors.fieldId === 'error' ? (
            <Typography color="error" textAlign="center">
              {errors.helperText}
            </Typography>
          ) : null}
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Box>
            <Link href="/sign-up">
              <Typography
                textAlign="center"
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                New? Create an account
              </Typography>
            </Link>
            <Typography textAlign="center" fontSize={14}>
              or
            </Typography>
            <Typography
              textAlign="center"
              fontSize={14}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={handleDemoAccount}
            >
              Use demo account
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
