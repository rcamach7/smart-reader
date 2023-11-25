import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    flex: 1,
    borderBottom: '1px solid black',
    marginRight: '8px',
  },
  '&::after': {
    content: '""',
    flex: 1,
    borderBottom: '1px solid black',
    marginLeft: '8px',
  },
});

interface Props {
  text: string;
}

export default function SectionSeparator({ text }: Props) {
  return (
    <Box>
      <StyledTypography>{text}</StyledTypography>
    </Box>
  );
}
