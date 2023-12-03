import { Box } from '@mui/material';
import { ShelfGallery } from '@/components/organisms';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import { ShelfType } from '../types';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Shelves() {
  const { setIsPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();
  const availableHeight = useAvailableHeight();
  const [publicShelves, setPublicShelves] = useState<ShelfType[]>([]);

  useEffect(() => {
    const fetchShelves = async () => {
      setIsPageLoading(true);
      try {
        const res = await axios.get('/api/shelf');
        setPublicShelves(res.data.shelves);
      } catch (error) {
        console.log(error);
        addAlertMessage({
          text: 'Error retrieving shelves',
          severity: 'error',
        });
      }
      setIsPageLoading(false);
    };

    fetchShelves();
  }, []);

  return (
    <Box
      sx={{
        minHeight: availableHeight,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          mt: 2,
          p: 0.5,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, sm: 2, md: 3 },
          maxWidth: 1200,
          pb: 5,
        }}
      >
        {publicShelves.map((shelf, i) => {
          return <ShelfGallery shelf={shelf} key={i} />;
        })}
      </Box>
    </Box>
  );
}
