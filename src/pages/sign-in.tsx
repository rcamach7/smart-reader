import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { Box, TextField, Typography, Button } from '@mui/material';
import useAvailableHeight from '@/hooks/useAvailableHeight';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const availableHeight = useAvailableHeight();

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
          id="outlined-required"
          label="Username"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          variant="outlined"
        />
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
}
