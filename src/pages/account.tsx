import { Box, Typography, Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { ConfirmModal } from '@/components/atoms';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Account() {
  const { user, logout, isUserLoading, setUser } = useUser();
  const router = useRouter();

  const [modalOpenState, setModalOpenState] = useState({
    updateProfileImageModal: false,
    editPasswordModal: false,
    confirmDeleteAccountModal: false,
  });
  const { setIsPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();
  const availableHeight = useAvailableHeight();
  const currentScreenSize = useResponsiveSize();

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async () => {
    setIsPageLoading(true);
    try {
      await axios.delete('/api/auth/user');
      setUser(null);
    } catch (error) {
      const err = error.response.data.message
        ? error.response.data.message
        : 'Error occurred while deleting account';

      addAlertMessage({ severity: 'error', text: err });
      console.log(err);
    }
    setModalOpenState((MOS) => {
      return { ...MOS, confirmDeleteAccountModal: false };
    });
    setIsPageLoading(false);
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
        <Typography
          variant="body1"
          sx={{ fontSize: 12, fontFamily: 'Verdana' }}
        >
          {user.type} user
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
            My Books
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
      </Stack>
      <Stack
        spacing={{ xs: 2, sm: 2.5, lg: 3 }}
        sx={{ flex: '1', pt: { xs: 2, sm: 3, md: 4 } }}
      >
        <Button
          size={currentScreenSize}
          variant="outlined"
          startIcon={<AccountBoxIcon />}
          disabled
        >
          Edit Profile Picture
        </Button>
        <Button
          size={currentScreenSize}
          variant="outlined"
          startIcon={<PasswordIcon />}
          disabled
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
          onClick={() => {
            setModalOpenState((MOS) => {
              return {
                ...MOS,
                confirmDeleteAccountModal: !MOS.confirmDeleteAccountModal,
              };
            });
          }}
        >
          Delete Account
        </Button>
      </Stack>
      <ConfirmModal
        open={modalOpenState.confirmDeleteAccountModal}
        toggle={() => {
          setModalOpenState((MOS) => {
            return {
              ...MOS,
              confirmDeleteAccountModal: !MOS.confirmDeleteAccountModal,
            };
          });
        }}
        confirmFunc={handleDeleteAccount}
        description="Warning! This action cannot be reversed, and all associates shelves will be deleted."
        title="Confirm Account Deletion"
      />
    </Box>
  );
}
