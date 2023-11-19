import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { Box, TextField, Typography, Button } from '@mui/material';
import useAvailableHeight from '@/hooks/useAvailableHeight';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const [toggleForm, setToggleForm] = useState<'sign-in' | 'sign-up'>(
    'sign-in'
  );
  const availableHeight = useAvailableHeight();

  const renderSignInForm = (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2 }}
      component="form"
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
