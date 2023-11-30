import React, { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, IconButton, Box } from '@mui/material';

import useCurrentBreakpoint from '@/hooks/useCurrentBreakpoint';

const ImageContainer = () => {
  const currentBreakpoint = useCurrentBreakpoint();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState([]);

  const calculateNumberOfItemsToDisplay = () => {
    switch (currentBreakpoint) {
      case 'xs':
        return 1;
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
      imageItems.slice(currentIndex, currentIndex + numberOfItems)
    );
  };

  const handleNext = () => {
    const numberOfItems = calculateNumberOfItemsToDisplay();
    if (currentIndex + numberOfItems < imageItems.length) {
      setCurrentIndex(currentIndex + numberOfItems);
    }
  };

  const handleBack = () => {
    const numberOfItems = calculateNumberOfItemsToDisplay();
    if (currentIndex - numberOfItems >= 0) {
      setCurrentIndex(currentIndex - numberOfItems);
    }
  };

  useEffect(() => {
    updateDisplayedItems();
  }, [currentBreakpoint, currentIndex, imageItems]);

  return (
    <Box>
      <Box sx={{ display: 'flex', border: 'solid black 1px', gap: 1 }}>
        {displayedItems.map((item, index) => (
          <Box key={index}>
            <img
              src={item.img}
              alt={item.altText}
              style={{ width: 100, height: 100 }}
            />
            <p>{item.rank}</p>
          </Box>
        ))}
      </Box>

      <IconButton onClick={handleBack} disabled={currentIndex === 0}>
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={
          currentIndex + calculateNumberOfItemsToDisplay() >= imageItems.length
        }
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

const imageItems = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    featured: true,
    rank: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
    rank: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
    rank: 3,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
    rank: 4,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
    rank: 5,
  },
];

export default ImageContainer;
