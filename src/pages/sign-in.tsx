import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

    if (credentials.username.length < 4) {
      setErrors({
        fieldId: 'username',
        helperText: 'Must 4 characters or longer',
      });
      return;
    } else if (credentials.password.length < 4) {
      setErrors({
        fieldId: 'password',
        helperText: 'Must 4 characters or longer',
      });
      return;
    }

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/auth/login', credentials);
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
      username: 'ironwolf',
      password: 'ironwolf',
    };
    setCredentials(demoCredentials);

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/auth/login', demoCredentials);
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
      <Typography variant="h3">Sign In</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2 }}
        component="form"
        onSubmit={handleSignIn}
      >
        <TextField
          required
          id="username"
          label="Username"
          variant="outlined"
          value={credentials.username}
          onChange={handleCredentialsChange}
          error={errors.fieldId === 'username' ? true : false}
          helperText={errors.fieldId === 'username' ? errors.helperText : ''}
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
            <Typography textAlign="center" sx={{ textDecoration: 'underline' }}>
              New? Create an account
            </Typography>
          </Link>
          <Typography textAlign="center" fontSize={14}>
            or
          </Typography>
          <Typography
            textAlign="center"
            fontSize={14}
            sx={{ textDecoration: 'underline' }}
            onClick={handleDemoAccount}
          >
            Use demo account
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
