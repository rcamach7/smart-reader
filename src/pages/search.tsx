import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

import {
  Box,
  InputBase,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardVoice as KeyboardVoiceIcon,
} from '@mui/icons-material';
import { BookCard } from '@/components/molecules';
import { SearchPageHeader } from '@/components/atoms';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import Book from '@/types/book';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { useLoadingContext } from '@/context/LoadingContext';

export default function SearchBooksPage() {
  const router = useRouter();
  const { type } = router.query;
  const query = typeof router.query === 'string' ? router.query : '';

  const availableHeight = useAvailableHeight();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const [search, setSearch] = useState({
    query: query ? query : '',
    type: type ? type : 'books',
  });
  const [bookSearchResults, setBookSearchResults] = useState<Book[]>([]);

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

  const handleSearchBooks = async () => {
    if (search.query.length <= 3) {
      addAlertMessage({ text: 'Query too short', severity: 'warning' });
      return;
    }

    setIsPageLoading(true);
    try {
      const encodedQuery = encodeURIComponent(search.query);
      const response = await axios.get(
        `/api/book/search?query=${encodedQuery}&type=query`
      );
      setBookSearchResults(response.data.books);
    } catch (error) {
      addAlertMessage({
        text: error.response.data.message
          ? error.response.data.message
          : 'Error searching for books',
        severity: 'error',
      });
      console.log(error);
    }
    setIsPageLoading(false);
  };

  const searchTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (!newAlignment) {
      return;
    }
    setSearch((S) => {
      return {
        ...S,
        type: newAlignment,
      };
    });
  };

  return (
    <Box
      sx={{
        height: availableHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
      }}
    >
      <SearchPageHeader />
      <ToggleButtonGroup
        color="primary"
        value={search.type}
        aria-label="search-type"
        onChange={searchTypeChange}
        exclusive
        size="small"
        sx={{ my: 1 }}
      >
        <ToggleButton value="books">books</ToggleButton>
        <ToggleButton value="shelves">shelves</ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'clamp(200px, 80vw, 500px)',
          height: 50,
          border: 'solid black 2px',
          borderRadius: '20px',
          px: 1,
        }}
      >
        <SearchIcon />
        <InputBase
          placeholder={`Search ${search.type}`}
          sx={{
            flex: 1,
            pl: 1,
            border: 'red black 2px',
          }}
          value={search.query}
          onChange={(e) => {
            setSearch((S) => {
              return {
                ...S,
                query: e.target.value,
              };
            });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchBooks();
            }
          }}
        />
        <KeyboardVoiceIcon sx={{ ml: 'auto' }} />
      </Box>

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

        {bookSearchResults.length && (
          <Pagination
            count={totalBookPages}
            page={currentBookPage}
            onChange={handleBookPageChange}
            sx={{ mt: 'auto', pb: 3 }}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
}
