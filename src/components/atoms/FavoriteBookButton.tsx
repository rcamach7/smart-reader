import { Button, Typography, IconButton } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

import axios from 'axios';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { BookType } from '@/types/index';

interface Props {
  book: BookType;
  type?: 'card';
}

export default function FavoriteBookButton({ book, type }: Props) {
  const { user, setUser } = useUser();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const handleFavoriteToggle = async () => {
    if (!user) {
      addAlertMessage({
        text: 'Please sign in to favorite this book.',
        severity: 'error',
      });
      return;
    }

    setIsPageLoading(true);
    try {
      const url = '/api/book/' + book.googleId + '/favorite';
      const res = await axios.post(url, { book });
      setUser((U) => {
        return {
          ...U,
          savedBooks: res.data.savedBooks,
        };
      });
      addAlertMessage({
        text: !isFavorited()
          ? 'Added book to favorites.'
          : 'Removed book from favorites.',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);
      addAlertMessage({
        text: 'Error adding to favorites.',
        severity: 'error',
      });
    }
    setIsPageLoading(false);
  };

  const isFavorited = () => {
    if (!user) return false;

    const favorites = user.savedBooks.map((el) => el.googleId);
    if (favorites.includes(book.googleId)) {
      return true;
    }
    return false;
  };

  if (type === 'card') {
    return (
      <IconButton
        size="small"
        aria-label="favorite"
        sx={{ px: 0.5 }}
        onClick={handleFavoriteToggle}
      >
        {isFavorited() ? (
          <FavoriteIcon sx={{ fontSize: 14 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 14 }} />
        )}
      </IconButton>
    );
  } else {
    return (
      <Button variant="outlined" onClick={handleFavoriteToggle}>
        {isFavorited() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        <Typography
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontSize: { xs: '.8rem', sm: '.9rem' },
          }}
        >
          {isFavorited() ? 'Remove Favorited' : 'Add To Favorites'}
        </Typography>
      </Button>
    );
  }
}
