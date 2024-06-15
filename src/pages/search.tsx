import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

import {
  Box,
  InputBase,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardVoice as KeyboardVoiceIcon,
} from '@mui/icons-material';
import {
  BookSearchResultsContainer,
  ShelvesSearchResultsContainer,
} from '@/components/molecules';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import Book from '@/types/book';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { ShelfType } from '../types';

export default function SearchBooksPage() {
  const router = useRouter();
  const { type, query } = router.query;
  const initialQuery = typeof query === 'string' ? query : '';

  const availableHeight = useAvailableHeight();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const [search, setSearch] = useState({
    query: initialQuery ? initialQuery : '',
    type: type ? type : 'books',
  });
  const [bookSearchResults, setBookSearchResults] = useState<Book[]>([]);
  const [shelvesSearchResults, setShelvesSearchResults] = useState<ShelfType[]>(
    []
  );

  const handleInputSearch = () => {
    if (search.type === 'books') {
      handleSearchBooks();
    } else {
      handleSearchShelves();
    }
  };

  const handleSearchShelves = async () => {
    if (search.query.length <= 3) {
      addAlertMessage({ text: 'Query too short.', severity: 'warning' });
      return;
    }

    setIsPageLoading(true);
    try {
      const encodedQuery = encodeURIComponent(search.query);
      const response = await axios.get(
        `/api/shelf/search?query=${encodedQuery}`
      );
      setShelvesSearchResults(response.data.shelves);
    } catch (error) {
      addAlertMessage({
        text: error.response.data.message
          ? error.response.data.message
          : 'Error searching for shelves.',
        severity: 'error',
      });
      console.log(error);
    }
    setIsPageLoading(false);
  };

  const handleSearchBooks = async () => {
    if (search.query.length <= 3) {
      addAlertMessage({ text: 'Query too short.', severity: 'warning' });
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
          : 'Error searching for books.',
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

  useEffect(() => {
    if (search.query.length) {
      handleInputSearch();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <Box
        sx={{
          minHeight: availableHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 2,
          pb: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              pr: 1,
              fontFamily: 'Verdana',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            I am searching for
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={search.type}
            aria-label="search-type"
            onChange={searchTypeChange}
            exclusive
            size="small"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ToggleButton
              value="books"
              sx={{
                '&.Mui-selected': {
                  color: 'white',
                  fontWeight: 'bold',
                },
                '&:not(.Mui-selected)': {
                  color: 'grey',
                  fontWeight: 'bold',
                },
              }}
            >
              books
            </ToggleButton>
            <ToggleButton
              value="shelves"
              sx={{
                '&.Mui-selected': {
                  color: 'white',
                },
                '&:not(.Mui-selected)': {
                  color: 'grey',
                },
              }}
            >
              shelves
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'clamp(200px, 80vw, 500px)',
            height: 50,
            border: 'solid #46A29F 2px',
            borderRadius: '20px',
            px: 1,
            mt: 1,
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder={`Search ${search.type}`}
            sx={{
              flex: 1,
              pl: 1,
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
                handleInputSearch();
              }
            }}
          />
          <KeyboardVoiceIcon sx={{ ml: 'auto' }} />
        </Box>

        {search.type === 'books' ? (
          <BookSearchResultsContainer bookSearchResults={bookSearchResults} />
        ) : (
          <ShelvesSearchResultsContainer
            shelfSearchResults={shelvesSearchResults}
          />
        )}
      </Box>
    </>
  );
}
