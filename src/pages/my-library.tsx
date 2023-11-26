import useAvailableHeight from '@/hooks/useAvailableHeight';
import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';

import { Box } from '@mui/material';
import { BookCard } from '@/components/molecules';
import { SectionHeader } from '@/components/atoms';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyLibrary() {
  const availableHeight = useAvailableHeight();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { setIsPageLoading } = useLoadingContext();

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
      sx={{
        height: availableHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: 'clamp(320px, 100vw, 900px)',
        }}
      >
        <SectionHeader
          title="My Favorited Books"
          buttonText="Search For More"
          handleButtonClick={() => {}}
        />
        <Box sx={{ p: 1 }}>
          {user.savedBooks.map((book) => {
            return <BookCard book={book} type="transparent" />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
