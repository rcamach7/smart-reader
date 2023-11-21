import { Box, Typography, Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Account() {
  const { user, logout, isUserLoading } = useUser();
  const router = useRouter();
  const { setIsPageLoading } = useLoadingContext();
  const availableHeight = useAvailableHeight();
  const currentScreenSize = useResponsiveSize();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push('/');
    }

    if (isUserLoading) {
      setIsPageLoading(true);
    } else {
      setIsPageLoading(false);
    }
  }, [user, isUserLoading]);

  if (isUserLoading || !user) {
    return null;
  }
  return (
    <Box
      style={{
        height: availableHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: '20px',
          backgroundColor: '#d3e3f0',
          width: '100%',
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '100px',
            height: '100px',
            boxShadow: '20px 20px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <img
            src={`/profile/${user.profileImage}`}
            alt="User Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography variant="h3" sx={{ p: 1, fontFamily: 'Verdana' }}>
          {user.username}
        </Typography>
      </Box>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        sx={{ py: 2 }}
      >
        <Link href="/my-favorites">
          <Button
            size={currentScreenSize}
            color="secondary"
            sx={{ textDecoration: 'underline' }}
          >
            My Favorited Books
          </Button>
        </Link>
        <Link href="my-shelves">
          <Button
            size={currentScreenSize}
            color="secondary"
            sx={{ textDecoration: 'underline' }}
          >
            My Shelves
          </Button>
        </Link>
        <Link href="my-books">
          <Button
            size={currentScreenSize}
            color="secondary"
            sx={{ textDecoration: 'underline' }}
          >
            My Books
          </Button>
        </Link>
      </Stack>
      <Stack
        spacing={{ xs: 2, sm: 2.5, lg: 3 }}
        sx={{ flex: '1', pt: { xs: 2, sm: 3, md: 4 } }}
      >
        <Button
          size={currentScreenSize}
          variant="outlined"
          startIcon={<AccountBoxIcon />}
        >
          Edit Profile Picture
        </Button>
        <Button
          size={currentScreenSize}
          variant="outlined"
          startIcon={<PasswordIcon />}
        >
          Edit Password
        </Button>
        <Button
          startIcon={<LogoutIcon />}
          size={currentScreenSize}
          variant="outlined"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
        <Button
          size={currentScreenSize}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete Account
        </Button>
      </Stack>
    </Box>
  );
}
