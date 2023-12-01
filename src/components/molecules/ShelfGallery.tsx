import React, { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';
import { BookCard } from '@/components/molecules';

import useCurrentBreakpoint from '@/hooks/useCurrentBreakpoint';
import { ShelfType } from '@/types/index';

interface Props {
  shelf: ShelfType;
}

export default function ShelfGallery({ shelf }: Props) {
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
        return 8;
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
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        {displayedItems.map((item, index) => (
          <BookCard
            key={item._id}
            shelfId={shelf._id}
            book={item}
            variant="gallery"
          />
        ))}
      </Box>

      <Box>
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
      </Box>
    </Box>
  );
}
