import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import Book from '@/types/book';
import useAvailableHeight from '@/hooks/useAvailableHeight';

import { PageLoading, BookDetailLine } from '@/components/atoms';
import { BookPageHeader } from '@/components/molecules';
import { FabButton } from '@/components/atoms';
import { Box, Typography, Button } from '@mui/material';

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

  const bookMetaDataKeys = [
    'categories',
    'publisher',
    'publishedDate',
    'printType',
    'language',
    'isbn',
    'isbn13',
  ];

  if (book) {
    return (
      <Box
        sx={{
          height: useAvailableHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <BookPageHeader book={book} />
        <Box
          sx={{
            textAlign: 'center',
            pb: 1,
            backgroundColor: '#d3e3f0',
            width: '100%',
          }}
        >
          <Typography>
            Get an AI-powered check to see if this book is your next great read!
          </Typography>
          <Button variant="outlined">Is This Book for Me?</Button>
        </Box>
        <Box
          sx={{
            p: 1,
            width: 'clamp(350px, 95vw, 700px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            justifyContent: 'center',
          }}
        >
          {bookMetaDataKeys.map((key, i) => {
            if (!book[key]) {
              return null;
            } else {
              const val =
                key === 'categories' ? book[key].join(', ') : book[key];
              return <BookDetailLine key={i} objKey={key} value={val} />;
            }
          })}
        </Box>
        <FabButton />
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
