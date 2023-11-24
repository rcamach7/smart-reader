import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import Book from '@/types/book';
import useAvailableHeight from '@/hooks/useAvailableHeight';

import { PageLoading } from '@/components/atoms';
import { Box, Typography, Button, IconButton } from '@mui/material';
import {
  FavoriteBorder as FavoriteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

export default function CategoryPage() {
  const { setIsPageLoading, isPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();

  const {
    query: { bookid: bid },
  } = useRouter();
  const googleId = bid as string;

  const [book, setBook] = useState<Book>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get('/api/book/' + googleId);
        setBook(res.data.book);
      } catch (error) {
        console.log(error);
      }
    };
    if (googleId) {
      fetchBook();
    }
  }, [googleId]);

  if (book) {
    return (
      <Box
        sx={{
          height: useAvailableHeight,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: 3,
            backgroundColor: '#d3e3f0',
            justifyContent: 'center',
          }}
        >
          {/* Content Container */}
          <Box sx={{ display: 'flex' }}>
            {/* Image Container */}
            <Box
              sx={{
                width: 'clamp(100px, 25vw, 125px)',
                height: 'auto',
                mr: 3,
              }}
            >
              <img
                src={book.imageLinks?.thumbnail}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  boxShadow: '20px 20px 20px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Box>
            {/* Text Container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: 400,
              }}
            >
              <Typography
                textAlign="center"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}
              >
                by {book.authors}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                  pt: { xs: 1, sm: 2, md: 3 },
                }}
              >
                <Button variant="outlined">
                  <FavoriteIcon />
                  <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Favorite
                  </Typography>
                </Button>
                <Button variant="outlined">
                  <AddIcon />
                  <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Add To Shelf
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (error) {
    return <>An unexpected error occurred</>;
  } else {
    return (
      <>
        <PageLoading />
      </>
    );
  }
}
