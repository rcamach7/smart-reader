import useAvailableHeight from '@/hooks/useAvailableHeight';
import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  FavoriteBooksContainer,
  MyShelvesContainer,
  ShelfFormModal,
} from '@/components/molecules';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

type ViewMode = 'favorites' | 'shelves';

export default function MyLibrary() {
  const availableHeight = useAvailableHeight();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { setIsPageLoading } = useLoadingContext();
  const [viewMode, setViewMode] = useState<ViewMode>('favorites');
  const [showCreateShelfModal, setShowCreateShelfModal] = useState(false);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === 'favorites' || newAlignment === 'shelves') {
      setViewMode(newAlignment);
    }
  };

  const toggleCreateShelfModal = () => {
    setShowCreateShelfModal((SCSM) => {
      return !SCSM;
    });
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
    <>
      <Head>
        <title>SR: My Library</title>
      </Head>
      <Box
        sx={{
          minHeight: availableHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 5,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: 'clamp(320px, 100vw, 900px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 1,
              pb: 1,
            }}
          >
            <ToggleButtonGroup
              color="primary"
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view-mode-selection"
            >
              <ToggleButton size="small" value="favorites">
                Favorites
              </ToggleButton>
              <ToggleButton size="small" value="shelves">
                Shelves
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {viewMode === 'favorites' ? (
            <FavoriteBooksContainer user={user} />
          ) : (
            <MyShelvesContainer
              shelves={user.shelves}
              toggleCreateShelfModal={toggleCreateShelfModal}
            />
          )}
        </Box>

        <ShelfFormModal
          type="create"
          open={showCreateShelfModal}
          toggle={() => {
            setShowCreateShelfModal((SCSM) => {
              return !SCSM;
            });
          }}
        />
      </Box>
    </>
  );
}
