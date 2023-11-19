import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { Box, TextField, Typography } from '@mui/material';
import useAvailableHeight from '@/hooks/useAvailableHeight';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const [toggleForm, setToggleForm] = useState<'sign-in' | 'sign-up'>(
    'sign-in'
  );
  const availableHeight = useAvailableHeight();

  const renderSignInForm = (
    <Box component="form">
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
    </Box>
  );

  const renderSignUpForm = <>Sign Up</>;

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
        border: '1px solid black',
        height: availableHeight,
        pb: 10,
      }}
    >
      <Typography variant="h3">
        {toggleForm === 'sign-in' ? 'Sign In' : 'Register'}
      </Typography>
      {toggleForm === 'sign-in' ? renderSignInForm : renderSignUpForm}
    </Box>
  );
}
