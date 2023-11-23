import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

import {
  Box,
  InputBase,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CardActionArea,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardVoice as KeyboardVoiceIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import Book from '@/types/book';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { shortenString } from '@/utils/helpers';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: 'clamp(350px, 80vw, 600px)',
          height: { xs: 100, sm: 125 },
          position: 'relative',
          borderRadius: '15px',
        }}
      >
        <img
          src="/search/books.png"
          alt="books in shelf"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '25%',
            maxWidth: 250,
          }}
        >
          <Typography
            textAlign="center"
            variant="h4"
            sx={{
              color: 'white',
              fontFamily: 'Verdana',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
              fontSize: { xs: 40, md: 45 },
            }}
          >
            Explore
          </Typography>
        </Box>
      </Box>
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
          p: 1,
          mt: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {bookSearchResults.map((book, i) => {
          return (
            <Card
              key={i}
              sx={{
                width: 133,
                pt: 0.5,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea>
                <CardMedia
                  sx={{
                    paddingTop: '120%',
                    backgroundSize: 'contain',
                  }}
                  image={book.imageLinks?.smallThumbnail}
                  title={book.title}
                />
              </CardActionArea>
              <CardContent
                sx={{
                  p: 0,
                  mb: 0,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  textAlign="center"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    p: 0,
                    px: 0.5,
                    fontSize: 14,
                  }}
                >
                  {shortenString(book.title, 30)}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  p: 0,
                  mt: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <IconButton size="small" aria-label="favorite" sx={{ px: 0.5 }}>
                  <FavoriteIcon sx={{ fontSize: 14 }} />
                </IconButton>
                <Button size="small" sx={{ px: 0.5, ml: '0px !important' }}>
                  Add To Shelf
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
