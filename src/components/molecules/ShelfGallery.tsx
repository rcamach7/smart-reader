import React, { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, IconButton, Box } from '@mui/material';

import useCurrentBreakpoint from '@/hooks/useCurrentBreakpoint';

const ImageContainer = () => {
  const currentBreakpoint = useCurrentBreakpoint();
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

  const handleNext = () => {};

  const handleBack = () => {};

  useEffect(() => {
    const numberOfItems = calculateNumberOfItemsToDisplay();
    setDisplayedItems(imageItems.slice(0, numberOfItems));
  }, [currentBreakpoint, imageItems]);

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
          </Box>
        ))}
      </Box>

      <IconButton onClick={handleBack}>
        <ArrowBackIos />
      </IconButton>
      <IconButton onClick={handleNext}>
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
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
];

export default ImageContainer;
