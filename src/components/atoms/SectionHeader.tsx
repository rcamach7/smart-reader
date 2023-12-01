import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

interface Props {
  title: string;
  buttonText: string;
  handleButtonClick?: () => void;
  buttonType?: 'link';
  link?: string;
}

export default function SectionHeader({
  title,
  buttonText,
  handleButtonClick,
  buttonType,
  link,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 1,
        pb: 1,
        boxShadow: '0 6px 4px -6px rgba(0, 0, 0, 0.5)',
        '&:hover': {
          boxShadow: '0 8px 6px -6px rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <Typography sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.1rem' } }}>
        {title}
      </Typography>
      {buttonType === 'link' ? (
        <Link href={link}>
          <Button variant="outlined" size="small">
            {buttonText}
          </Button>
        </Link>
      ) : (
        <Button variant="outlined" size="small" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
}
