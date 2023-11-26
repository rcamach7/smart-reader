import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BookType } from '@/types/index';
import { FavoriteBookButton } from '@/components/atoms';

interface Props {
  book: BookType;
}

export default function BookPageHeader({ book }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        p: 3,
        backgroundColor: '#d3e3f0',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: 'clamp(100px, 25vw, 125px)',
            height: 'auto',
            mr: 3,
          }}
        >
          <img
            src={book.imageLinks?.thumbnail}
            alt={book.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              boxShadow: '20px 10px 20px rgba(0, 0, 0, 0.3)',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 400,
          }}
        >
          <Typography
            textAlign="center"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
            }}
          >
            {book.title}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}
          >
            by {book.authors}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              pt: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <FavoriteBookButton googleId={book.googleId} />
            <Button variant="outlined">
              <AddIcon />
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                Add To Shelf
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
