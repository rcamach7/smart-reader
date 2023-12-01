import React, { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';

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
        return 3;
      case 'md':
        return 5;
      default:
        return 7;
    }
  };

  const updateDisplayedItems = () => {
    const numberOfItems = calculateNumberOfItemsToDisplay();
    setDisplayedItems(
      shelf.books.slice(currentIndex, currentIndex + numberOfItems)
    );
  };

  const handleNext = () => {
    if (currentIndex + 1 < shelf.books.length) {
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

  console.log(shelf);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        {displayedItems.map((item, index) => (
          <Box key={index}>
            <img src={item.imageLinks?.smallThumbnail} style={{ width: 150 }} />
          </Box>
        ))}
      </Box>

      <Box>
        <IconButton onClick={handleBack} disabled={currentIndex === 0}>
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={currentIndex + 1 >= shelf.books.length}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
}
