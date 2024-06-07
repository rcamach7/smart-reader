import { Box, Typography, Stack, Button } from '@mui/material';
import {
  Delete as DeleteIcon,
  Password as PasswordIcon,
  AccountBox as AccountBoxIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { ConfirmModal, LinkItem } from '@/components/atoms';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { useTheme } from '@mui/material';

export default function Account() {
  const { user, logout, isUserLoading, setUser } = useUser();
  const router = useRouter();
  const theme = useTheme();

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

  const linkOptions = [
    { title: 'My Library', link: '/my-library' },
    { title: 'Search For Books', link: '/search' },
    { title: 'View Public Shelves', link: '/shelves' },
  ];

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
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Box
        sx={{
          minHeight: availableHeight,
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
            width: '100%',
            pt: 2,
            backgroundColor: '#202833',
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
          {linkOptions.map((option, i) => {
            return (
              <Button key={i} sx={{ textDecoration: 'underline' }}>
                <LinkItem text={option.title} link={option.link} />
              </Button>
            );
          })}
        </Stack>

        <Stack
          spacing={{ xs: 2, sm: 2.5, lg: 3 }}
          sx={{ flex: '1', pt: { xs: 2, sm: 3, md: 4 } }}
        >
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
          type="confirm"
        />
      </Box>
    </>
  );
}
