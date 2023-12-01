import * as React from 'react';
import axios from 'axios';

import { Button, Menu, MenuItem, Typography } from '@mui/material/';
import { Add as AddIcon } from '@mui/icons-material';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { BookType } from '@/types/index';

interface Props {
  type?: 'card';
  book: BookType;
}

export default function ShelfSelectionMenu({ type, book }: Props) {
  const { user, setUser } = useUser();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddBookToShelf = async (shelfId) => {
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
      const res = await axios.post(url, { book });
      setUser((U) => {
        return {
          ...U,
          shelves: U.shelves.map((shelf) => {
            if (shelf._id === res.data.shelf._id) {
              return res.data.shelf;
            } else {
              return shelf;
            }
          }),
        };
      });
    } catch (error) {
      console.log(error);
      addAlertMessage({ text: 'Error adding to shelf', severity: 'error' });
    }
    setIsPageLoading(false);

    setAnchorEl(null);
  };

  return (
    <div>
      {type === 'card' ? (
        <Button
          id="basic-button"
          aria-controls={open ? 'shelf-selection-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="small"
          sx={{ px: 0.5, ml: '0px !important' }}
        >
          Add To Shelf
        </Button>
      ) : (
        <Button
          variant="outlined"
          id="basic-button"
          aria-controls={open ? 'shelf-selection-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddIcon />
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
            Add To Shelf
          </Typography>
        </Button>
      )}
      <Menu
        id="shelf-selection-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user?.shelves?.map((shelf, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                handleAddBookToShelf(shelf._id);
              }}
            >
              {shelf.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
