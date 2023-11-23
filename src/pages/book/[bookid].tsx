import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

import { PageLoading } from '@/components/atoms';
import Book from '@/types/book';

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
      <>
        <p>{book.title}</p>
        <p>{book.categories}</p>
        <img src={book.imageLinks?.thumbnail} alt="" />
      </>
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
