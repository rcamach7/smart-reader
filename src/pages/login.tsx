import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { Box } from '@mui/material';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const [toggleForm, setToggleForm] = useState<'sign-in' | 'sign-up'>(
    'sign-in'
  );

  const signInForm = <></>;

  const signUpForm = <></>;

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
        border: '1px solid black',
        height: '100vh',
      }}
    >
      <p>Sign In Page</p>
    </Box>
  );
}
