import useAvailableHeight from '@/hooks/useAvailableHeight';
import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BookCard } from '@/components/molecules';
import { SectionHeader } from '@/components/atoms';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type ViewMode = 'favorites' | 'shelves';

export default function MyLibrary() {
  const availableHeight = useAvailableHeight();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { setIsPageLoading } = useLoadingContext();
  const [viewMode, setViewMode] = useState<ViewMode>('favorites');

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === 'favorites' || newAlignment === 'shelves') {
      setViewMode(newAlignment);
    }
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

  const renderFavoritedBooks = (
    <Box>
      <SectionHeader
        title="My Favorited Books"
        buttonText="Search For More"
        buttonType="link"
        link="/search"
        handleButtonClick={() => {}}
      />
      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        {user.savedBooks.map((book) => {
          return <BookCard book={book} type="transparent" />;
        })}
      </Box>
    </Box>
  );

  const renderShelves = (
    <Box>
      <SectionHeader
        title="My Shelves"
        buttonText="Create New"
        handleButtonClick={() => {}}
      />
    </Box>
  );
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: { xs: 1, md: 2 },
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
        {viewMode === 'favorites' ? renderFavoritedBooks : renderShelves}
      </Box>
    </Box>
  );
}
