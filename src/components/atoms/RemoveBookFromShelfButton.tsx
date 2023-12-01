import { Button } from '@mui/material';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { BookType } from '@/types/index';

import axios from 'axios';

interface Props {
  book: BookType;
  shelfId: string;
}

export default function RemoveBookFromShelfButton({ book, shelfId }: Props) {
  const { user, setUser } = useUser();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const handleClick = async () => {
    if (!user) {
      addAlertMessage({
        text: 'Please sign in.',
        severity: 'error',
      });
      return;
    }

    setIsPageLoading(true);
    try {
      const url = '/api/shelf/' + shelfId + '/book';
      const res = await axios.put(url, { book });
      setUser((U) => {
        return {
          ...U,
          shelves: U.shelves.map((curShelf) => {
            if (curShelf._id === shelfId) {
              return res.data.shelf;
            } else {
              return curShelf;
            }
          }),
        };
      });
    } catch (error) {
      console.log(error);
      addAlertMessage({ text: 'Error removing from shelf', severity: 'error' });
    }
    setIsPageLoading(false);
  };

  return (
    <Button
      id="basic-button"
      aria-controls={open ? 'shelf-selection-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      size="small"
      sx={{ px: 0.5, ml: '0px !important' }}
    >
      Remove Book
    </Button>
  );
}
