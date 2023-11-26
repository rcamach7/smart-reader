import { Button, Typography } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

import axios from 'axios';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

interface Props {
  googleId: string;
}

export default function FavoriteBookButton({ googleId }: Props) {
  const { user, setUser } = useUser();
  const { addAlertMessage } = useFeedbackContext();

  const handleFavoriteToggle = async () => {
    if (!user) {
      addAlertMessage({
        text: 'Please sign in to favorite this book.',
        severity: 'error',
      });
      return;
    }
    try {
      const res = await axios.post('/api/book');
    } catch (error) {}
  };

  const isFavorited = () => {
    if (!user) return false;

    const favorites = user.savedBooks.map((el) => el.googleId);
    if (favorites.includes(googleId)) {
      return true;
    }
    return false;
  };

  return (
    <Button variant="outlined" onClick={handleFavoriteToggle}>
      {isFavorited() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
        Favorite
      </Typography>
    </Button>
  );
}
