import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

import { PageLoading } from '@/components/atoms';

export default function CategoryPage() {
  const { setIsPageLoading, isPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();

  const {
    query: { bookid: bid },
  } = useRouter();
  const googleId = bid as string;

  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (googleId) {
    }
  }, []);

  if (book) {
    return <>{googleId}</>;
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
