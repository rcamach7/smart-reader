import { Box, Typography, Button, Skeleton } from '@mui/material';
import { ShelfGallery } from '@/components/organisms';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useTheme } from '@mui/material';

import Shelf from '@/types/shelf';
import useAvailableHeight from '@/hooks/useAvailableHeight';
import { useFeedbackContext } from '@/context/FeedbackContext';

export default function Home() {
  const availableHeight = useAvailableHeight();
  const { addAlertMessage } = useFeedbackContext();
  const [previewShelves, setPreviewShelves] = useState<Shelf[]>([]);
  const theme = useTheme();

  const updatePreviewShelf = (shelf: Shelf) => {
    setPreviewShelves((PS) => {
      return PS.map((PS) => {
        if (PS._id === shelf._id) {
          return shelf;
        } else {
          return PS;
        }
      });
    });
  };

  useEffect(() => {
    const fetchPublicShelves = async () => {
      try {
        const res = await axios.get('/api/shelf/homepage');
        setPreviewShelves(res.data.shelves);
      } catch (error) {
        console.log(error);
        addAlertMessage({
          text: 'Error fetching public shelves.',
          severity: 'error',
        });
      }
    };

    fetchPublicShelves();
  }, []);

  return (
    <>
      <Head>
        <title>Smart Reads</title>
      </Head>
      <Box
        sx={{
          [previewShelves.length ? 'minHeight' : 'maxHeight']: availableHeight,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            width: '100%',
            height: { xs: 300, sm: 350, md: 375, lg: 400 },
            position: 'relative',
          }}
        >
          <img
            src="/home/pattern.jpg"
            alt="library image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '20%',
              maxWidth: 600,
            }}
          >
            <Typography
              textAlign="center"
              variant="h1"
              sx={{
                fontFamily: 'Verdana',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                fontSize: '2rem',
                maxWidth: 250,
                fontWeight: 'bold',
              }}
            >
              SmartReads
            </Typography>
            <Typography sx={{ fontSize: { sm: '1.2rem', md: '1.7rem' } }}>
              Share, Chat, Explore.
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                textAlign="center"
                sx={{ fontSize: { sm: 16, md: 19 }, maxWidth: 330, pb: 1 }}
              >
                Save books, create shelves, share with friends, and get
                AI-powered book answers!
              </Typography>
              <Link href="/shelves">
                <Button variant="contained">Browse Public Shelves</Button>
              </Link>
            </Box>
          </Box>

          {/* Gradient transition to next section */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50px',
              background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #0B0D10 100%)',
            }}
          />
        </Box>

        <Box
          sx={{
            px: 2,
            pt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            flex: '1',
            overflow: 'hidden',
          }}
        >
          {previewShelves.length ? (
            previewShelves.map((shelf, i) => {
              return (
                <ShelfGallery
                  shelf={shelf}
                  key={i}
                  type="preview"
                  updateShelfFunc={updatePreviewShelf}
                />
              );
            })
          ) : (
            <Box
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
              }}
            >
              {Array.from({ length: 3 }, (_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 'clamp(310px, 98vw, 900px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.2,
                  }}
                >
                  <Skeleton animation="wave" variant="rounded" height={35} />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={80}
                  />
                  <Skeleton animation="wave" variant="rounded" height={20} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
