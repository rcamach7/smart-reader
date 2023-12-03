import { BookType } from '@/types/index';
import { BookCard } from '@/components/molecules';

import { Box, Pagination } from '@mui/material';

import { useState } from 'react';

interface Props {
  bookSearchResults: BookType[];
}

export default function SearchResultsContainer({ bookSearchResults }) {
  const [currentBookPage, setCurrentBookPage] = useState(1);
  const itemsPerPage = 15;
  const totalBookPages = Math.ceil(bookSearchResults.length / itemsPerPage);
  const indexOfLastBook = currentBookPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = bookSearchResults.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  const handleBookPageChange = (event, value) => {
    setCurrentBookPage(value);
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
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {currentBooks.map((book, i) => {
          return <BookCard key={i} book={book} />;
        })}
      </Box>
      {bookSearchResults.length ? (
        <Pagination
          count={totalBookPages}
          page={currentBookPage}
          onChange={handleBookPageChange}
          sx={{ mt: 'auto', pb: 3 }}
          color="primary"
        />
      ) : null}
    </Box>
  );
}
