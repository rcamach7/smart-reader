import useAvailableHeight from '@/hooks/useAvailableHeight';

import { Box, Button, Typography } from '@mui/material';

export default function MyLibrary() {
  const availableHeight = useAvailableHeight();

  return (
    <Box
      sx={{
        height: availableHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: 'clamp(320px, 100vw, 900px)',
        }}
      >
        <Typography textAlign="center" gutterBottom>
          My Library
        </Typography>

        <SectionHeader
          title="My Favorited Books"
          buttonText="Search For More"
          handleButtonClick={() => {}}
        />
        <Box></Box>
      </Box>
    </Box>
  );
}

interface Props {
  title: string;
  buttonText: string;
  handleButtonClick: () => void;
}

function SectionHeader({ title, buttonText, handleButtonClick }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        boxShadow: '0 6px 4px -6px rgba(0, 0, 0, 0.5)',
        '&:hover': {
          boxShadow: '0 8px 6px -6px rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <Typography
        sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}
      >
        {title}
      </Typography>
      <Button variant="outlined">{buttonText}</Button>
    </Box>
  );
}
