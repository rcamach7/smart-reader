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
import { Box, Typography } from '@mui/material';

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

  const StyledTypography = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid black',
      marginRight: '8px',
    },
    '&::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid black',
      marginLeft: '8px',
    },
  });

  useEffect(() => {
    console.log(book);
  }, [book]);

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
