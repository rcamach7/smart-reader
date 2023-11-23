import { Box, Typography } from '@mui/material';

export default function SearchPageHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 'clamp(350px, 80vw, 600px)',
        height: { xs: 75, sm: 100 },
        position: 'relative',
        borderRadius: '15px',
      }}
    >
      <img
        src="/search/books.png"
        alt="books in shelf"
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
          bottom: '25%',
          maxWidth: 250,
        }}
      >
        <Typography
          textAlign="center"
          variant="h4"
          sx={{
            color: 'white',
            fontFamily: 'Verdana',
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
            fontSize: { xs: 40, md: 45 },
          }}
        >
          Explore
        </Typography>
      </Box>
    </Box>
  );
}
