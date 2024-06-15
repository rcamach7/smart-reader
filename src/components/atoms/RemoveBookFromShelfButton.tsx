import { Button } from '@mui/material';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { BookType, ShelfType } from '@/types/index';

import axios from 'axios';

interface Props {
  book: BookType;
  shelf: ShelfType;
}

export default function RemoveBookFromShelfButton({ book, shelf }: Props) {
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
      const url = '/api/shelf/' + shelf._id + '/book';
      const res = await axios.put(url, { book });
      setUser((U) => {
        return {
          ...U,
          shelves: U.shelves.map((curShelf) => {
            if (curShelf._id === shelf._id) {
              return res.data.shelf;
            } else {
              return curShelf;
            }
          }),
        };
      });
      addAlertMessage({
        text: 'Successfully removed book from shelf.',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);
      addAlertMessage({
        text: 'Error removing from shelf.',
        severity: 'error',
      });
    }
    setIsPageLoading(false);
  };

  const isMyShelf = () => {
    if (!user) return false;

    if (shelf.creator._id === user?._id) {
      return true;
    } else {
      return false;
    }
  };

  if (!isMyShelf()) {
    return null;
  }
  return (
    <Button
      id="basic-button"
      aria-controls={open ? 'shelf-selection-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      size="small"
      sx={{ px: 0.5, ml: '0px !important', fontSize: '.8rem' }}
    >
      Remove Book
    </Button>
  );
}
