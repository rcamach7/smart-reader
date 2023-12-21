import { Box, Typography } from '@mui/material';

import { useTheme } from '@mui/material';

import { shortenString } from '@/utils/helpers';

interface Props {
  objKey: string;
  value: string;
}

export default function BookDetailLine({ objKey, value }: Props) {
  const theme = useTheme();

  if (!value) {
    return null;
  }
  if (objKey === 'publishedDate') {
    objKey = 'Date Published';
  } else if (objKey === 'printType') {
    objKey = 'Print Type';
  } else {
    if (objKey !== 'isbn' && objKey !== 'isbn13') {
      objKey = objKey.substring(0, 1).toUpperCase().concat(objKey.substring(1));
    }
  }
  const dynamicFontSize = {
    fontSize: { xs: '1rem', sm: '1.1rem' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: 310,
        alignItems: 'center',
        borderBottom: `solid ${
          theme.palette.mode === 'dark' ? 'white' : 'black'
        } 1px`,
      }}
    >
      <Typography
        sx={{
          flex: 1.5,
          fontWeight: 'bold',
          ...dynamicFontSize,
        }}
      >
        {objKey}
      </Typography>
      <Typography sx={{ flex: 2, ...dynamicFontSize }}>
        {shortenString(value, 30)}
      </Typography>
    </Box>
  );
}
