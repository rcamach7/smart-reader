import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import Head from 'next/head';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import Book from '@/types/book';
import useAvailableHeight from '@/hooks/useAvailableHeight';

import { PageLoading, BookDetailLine } from '@/components/atoms';
import { BookPageHeader } from '@/components/molecules';
import { ConfirmModal } from '@/components/atoms';
import { Chat } from '@/components/organisms';
import { Box, Typography, Button } from '@mui/material';

export default function CategoryPage() {
  const { setIsPageLoading, isPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();
  const [summaryModal, setSummaryModal] = useState({
    show: false,
    summary: '',
  });
  const theme = useTheme();

  const {
    query: { bookid: bid },
  } = useRouter();
  const googleId = bid as string;

  const [book, setBook] = useState<Book>(null);
  const [error, setError] = useState(false);

  const toggleShowSummaryModal = () => {
    setSummaryModal((SM) => ({ ...SM, show: !SM.show }));
  };

  const getBookSummary = async () => {
    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/ai/blurb', { book });
      setSummaryModal({ ...summaryModal, summary: res.data.summary });
      toggleShowSummaryModal();
    } catch (error) {
      addAlertMessage({
        text: error?.response?.data?.message,
        severity: 'error',
      });
      console.log(error);
    }
    setIsPageLoading(false);
  };

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
      <>
        <Head>
          <title>{book.title}</title>
        </Head>
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
              pb: 1.5,
              backgroundColor:
                theme.palette.mode === 'dark' ? 'transparent' : '#d3e3f0',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '.9rem', sm: '1rem', md: '1.1rem' },
                px: 1,
                pb: 1,
                maxWidth: 600,
              }}
            >
              Discover your next favorite read with our AI-powered book
              insights! We analyze your favorite books to identify any
              similarities and offer a tailored overview and recommendation.
            </Typography>
            <Button variant="outlined" onClick={getBookSummary}>
              Get My Personalized Book Insight
            </Button>
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
          <Chat book={book} />
          <ConfirmModal
            open={summaryModal.show}
            type="information"
            description={summaryModal.summary}
            title="Your Recommendation"
            toggle={toggleShowSummaryModal}
          />
        </Box>
      </>
    );
  } else if (error) {
    return <>An unexpected error occurred</>;
  } else {
    return (
      <>
        <Head>
          <title>...</title>
        </Head>
        <PageLoading />
      </>
    );
  }
}
