import React, { useState, useEffect } from 'react';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { BookCard } from '@/components/molecules';
import ShelfActionButtons from './ShelfActionButtons';

import useCurrentBreakpoint from '@/hooks/useCurrentBreakpoint';
import { ShelfType } from '@/types/index';

interface Props {
  shelf: ShelfType;
  type?: 'preview';
  updateShelfFunc?: (shelf: ShelfType) => void;
}

export default function ShelfGallery({ shelf, type, updateShelfFunc }: Props) {
  const currentBreakpoint = useCurrentBreakpoint();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState([]);

  const calculateNumberOfItemsToDisplay = () => {
    switch (currentBreakpoint) {
      case 'xs':
        return 2;
      case 'sm':
        return 4;
      case 'md':
        return 6;
      default:
        return 6;
    }
  };

  const updateDisplayedItems = () => {
    const numberOfItems = calculateNumberOfItemsToDisplay();
    setDisplayedItems(
      shelf.books.slice(currentIndex, currentIndex + numberOfItems)
    );
  };

  const handleNext = () => {
    const numberOfItems = calculateNumberOfItemsToDisplay();
    const maxIndex = shelf.books.length - numberOfItems;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    updateDisplayedItems();
  }, [currentBreakpoint, currentIndex, shelf.books]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 0.5,
        backgroundColor: 'transparent',
      }}
      elevation={3}
    >
      <Box sx={{ width: '100%', maxWidth: 900, px: { xs: 1, sm: 2, md: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {shelf.name}
        </Typography>
        <Typography component="span" sx={{ fontSize: 14 }}>
          by {shelf.creator.username}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, py: 1 }}>
        {displayedItems.map((item) => (
          <BookCard
            key={item._id}
            shelf={shelf}
            book={item}
            variant="gallery"
            type="transparent"
          />
        ))}
      </Box>
      <Box sx={{ width: '100%', maxWidth: 900, px: { xs: 1, sm: 2, md: 3 } }}>
        <Typography variant="body1">{shelf.description}</Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={handleBack} disabled={currentIndex === 0}>
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={
            currentIndex >=
            shelf.books.length - calculateNumberOfItemsToDisplay()
          }
        >
          <ArrowForwardIos />
        </IconButton>

        <ShelfActionButtons
          shelf={shelf}
          type={type}
          updateShelfFunc={updateShelfFunc ? updateShelfFunc : null}
        />
      </Box>
    </Paper>
  );
}
