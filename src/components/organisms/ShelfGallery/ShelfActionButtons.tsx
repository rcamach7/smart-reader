import {
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  BookmarkAdded as BookmarkAddedIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { BookCard, ShelfFormModal } from '@/components/molecules';

import axios from 'axios';
import { useState } from 'react';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import Shelf from '@/types/shelf';
interface Props {
  shelf: Shelf;
  type?: 'preview';
  updateShelfFunc?: (shelf: Shelf) => void;
}

export default function ActionButtons({ shelf, type, updateShelfFunc }: Props) {
  const { user, setUser } = useUser();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();
  const [showEditShelfModal, setShowEditShelfModal] = useState(false);

  const toggle = () => {
    setShowEditShelfModal((SESM) => !SESM);
  };

  const isUsersShelf = () => {
    if (!user) return false;
    if (shelf.creator._id === user._id) return true;
    return false;
  };

  const handleSaveShelfToggle = async () => {
    if (!user) {
      addAlertMessage({
        text: 'Please sign in to save a shelf',
        severity: 'error',
      });
      return;
    }

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/shelf/' + shelf._id + '/save');
      setUser((U) => ({ ...U, shelves: res.data.shelves }));
    } catch (error) {
      addAlertMessage({
        text: 'Error toggling save on shelf',
        severity: 'error',
      });
    }
    setIsPageLoading(false);
  };

  const handleLikeShelf = async () => {
    if (!user) {
      addAlertMessage({
        text: 'Please sign in to like this shelf',
        severity: 'error',
      });
      return;
    }

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/shelf/' + shelf._id + '/like');
      const updatedShelf = res.data.shelf;

      if (type === 'preview') {
        updateShelfFunc(updatedShelf);
      }
      setUser((U) => ({
        ...U,
        shelves: U.shelves.map((curShelf) => {
          if (curShelf._id === updatedShelf._id) {
            return updatedShelf;
          } else {
            return curShelf;
          }
        }),
      }));

      addAlertMessage({
        text: 'Toggled like for this shelf',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);
      addAlertMessage({ text: 'Error toggling like', severity: 'error' });
    }
    setIsPageLoading(false);
  };

  const hasUserLiked = () => {
    if (!user) return false;

    for (let i = 0; i < shelf.likes.length; i++) {
      if (shelf.likes[i]._id === user._id) {
        return true;
      }
    }
    return false;
  };

  const hasUserSaved = () => {
    if (!user) return false;

    for (let i = 0; i < user.shelves.length; i++) {
      if (shelf._id === user.shelves[i]._id) {
        return true;
      }
    }
    return false;
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        size="small"
        sx={{ px: 0.5, minWidth: 20 }}
        onClick={handleLikeShelf}
      >
        {hasUserLiked() ? (
          <ThumbUpAltIcon sx={{ fontSize: 20 }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
        )}
        <Typography
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontSize: { xs: '.8rem', sm: '.9rem' },
            pl: { xs: 0, sm: 0.5 },
          }}
        >
          Like
        </Typography>
      </Button>

      {isUsersShelf() ? (
        <>
          <Button size="small" color="error" sx={{ px: 0.5, minWidth: 20 }}>
            <DeleteOutlineIcon sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '.8rem', sm: '.9rem' },
              }}
            >
              Delete Shelf
            </Typography>
          </Button>
          <Button size="small" sx={{ px: 0.5, minWidth: 20 }} onClick={toggle}>
            <EditIcon sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '.8rem', sm: '.9rem' },
              }}
            >
              Edit Shelf
            </Typography>
          </Button>
        </>
      ) : (
        <>
          <Button
            size="small"
            sx={{ px: 0.5, minWidth: 20 }}
            onClick={handleSaveShelfToggle}
          >
            {hasUserSaved() ? (
              <BookmarkAddedIcon sx={{ fontSize: 20 }} />
            ) : (
              <BookmarkBorderIcon sx={{ fontSize: 20 }} />
            )}
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '.8rem', sm: '.9rem' },
                pl: { xs: 0, sm: 0.5 },
              }}
            >
              {hasUserSaved() ? 'Unsave' : 'Save'}
            </Typography>
          </Button>
        </>
      )}

      <ShelfFormModal
        open={showEditShelfModal}
        toggle={toggle}
        type="edit"
        description={shelf.description}
        name={shelf.name}
        isPublic={shelf.public}
        shelfId={shelf._id}
      />
    </Box>
  );
}
