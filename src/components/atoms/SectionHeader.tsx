import { Box, Typography, Button } from '@mui/material';

interface Props {
  title: string;
  buttonText: string;
  handleButtonClick: () => void;
}

export default function SectionHeader({
  title,
  buttonText,
  handleButtonClick,
}: Props) {
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
      <Typography sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.1rem' } }}>
        {title}
      </Typography>
      <Button variant="outlined" size="small">
        {buttonText}
      </Button>
    </Box>
  );
}
