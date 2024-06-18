import { Box, Typography } from '@mui/material';
import { ShelfSelectionMenu } from '@/components/molecules';
import { FavoriteBookButton } from '@/components/atoms';

import { BookType } from '@/types/index';
import { useTheme } from '@mui/material';

interface Props {
  book: BookType;
}

export default function BookPageHeader({ book }: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        p: 3,
        backgroundColor:
          theme.palette.mode === 'dark' ? 'transparent' : '#202833',
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
            <FavoriteBookButton book={book} />
            <ShelfSelectionMenu book={book} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
