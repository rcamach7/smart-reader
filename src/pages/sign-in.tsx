import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { Box, TextField, Typography, Button } from '@mui/material';
import useAvailableHeight from '@/hooks/useAvailableHeight';
import Link from 'next/link';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const availableHeight = useAvailableHeight();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleCredentialsChange = (e) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    alert('signed in');
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
        height: availableHeight,
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
        />
        <TextField
          required
          id="password"
          label="Password"
          variant="outlined"
          value={credentials.password}
          onChange={handleCredentialsChange}
        />
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
          >
            Use demo account
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
