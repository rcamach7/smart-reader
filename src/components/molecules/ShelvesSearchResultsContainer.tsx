import { ShelfGallery } from '@/components/organisms';

import { Box, Pagination } from '@mui/material';

import { useState } from 'react';
import { ShelfType } from '@/types/index';

interface Props {
  shelfSearchResults: ShelfType[];
}

export default function SearchResultsContainer({ shelfSearchResults }: Props) {
  const [currentShelfPage, setCurrentShelfPage] = useState(1);
  const itemsPerPage = 15;
  const totalShelfPages = Math.ceil(shelfSearchResults.length / itemsPerPage);
  const indexOfLastShelf = currentShelfPage * itemsPerPage;
  const indexOfFirstShelf = indexOfLastShelf - itemsPerPage;
  const currentShelves = shelfSearchResults.slice(
    indexOfFirstShelf,
    indexOfLastShelf
  );

  const handleShelfPageChange = (event, value) => {
    setCurrentShelfPage(value);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          p: 1,
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {currentShelves.map((shelf, i) => {
          return <ShelfGallery key={i} shelf={shelf} />;
        })}
      </Box>
      {shelfSearchResults.length ? (
        <Pagination
          count={totalShelfPages}
          page={currentShelfPage}
          onChange={handleShelfPageChange}
          sx={{ mt: 'auto', pb: 3 }}
          color="primary"
        />
      ) : null}
    </Box>
  );
}
