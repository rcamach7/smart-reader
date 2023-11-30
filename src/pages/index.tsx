import { Box, Typography, Button } from '@mui/material';
import { ShelfGallery } from '@/components/molecules';

import useAvailableHeight from '@/hooks/useAvailableHeight';

import Link from 'next/link';

export default function Home() {
  const availableHeight = useAvailableHeight();

  return (
    <Box sx={{ height: availableHeight }}>
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
          src="/home/library.png"
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
            position: 'absolute',
            bottom: '20%',
            maxWidth: 250,
          }}
        >
          <Typography
            textAlign="center"
            variant="h5"
            sx={{
              color: 'white',
              fontFamily: 'Verdana',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
              fontSize: { sm: 24, md: 30 },
            }}
          >
            <span
              style={{
                padding: 3,
                color: '#6fa6b6',
                fontWeight: 'bold',
              }}
            >
              BookSphere
            </span>{' '}
            Share, Chat, Explore.
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <Link href="/shelves">
              <Button variant="contained">Browse Collections</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#d3e3f0',
          p: { xs: 0.5, md: 1 },
        }}
      >
        <Typography
          textAlign="center"
          sx={{ fontSize: { sm: 16, md: 19 }, maxWidth: 600 }}
        >
          Discover BookSphere: Bookmark books, create shelves, and share with
          friends. Plus, get AI-powered answers to all your book-related
          questions!
        </Typography>
      </Box>
      <Box sx={{ border: 'solid red 2px', p: 2 }}>
        <ShelfGallery />
      </Box>
    </Box>
  );
}
