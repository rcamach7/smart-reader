import { useRouter } from 'next/router';

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

  if (googleId) {
    return <>{googleId}</>;
  } else {
    return (
      <>
        <PageLoading />
      </>
    );
  }
}
