import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { Box, TextField, Typography, Button } from '@mui/material';
import useAvailableHeight from '@/hooks/useAvailableHeight';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const availableHeight = useAvailableHeight();

  const handleSignUp = async (e) => {
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
      <Typography variant="h3">Sign Up!</Typography>
    </Box>
  );
}
