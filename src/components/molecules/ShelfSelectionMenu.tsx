import * as React from 'react';

import { Button, Menu, MenuItem, Typography } from '@mui/material/';
import { Add as AddIcon } from '@mui/icons-material';

import { useUser } from '@/context/UserContext';

interface Props {
  type?: 'card';
}

export default function ShelfSelectionMenu({ type }: Props) {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
            <MenuItem key={i} onClick={handleClose}>
              {shelf.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
