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
  } else if (objKey === 'categories') {
    objKey = 'Category(ies)';
  } else {
    if (objKey !== 'isbn' && objKey !== 'isbn13') {
      objKey = objKey.substring(0, 1).toUpperCase().concat(objKey.substring(1));
    }
  }
  const dynamicFontSize = {
    fontSize: { xs: '.9rem', sm: '1rem' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: 325,
        alignItems: 'center',
        borderRadius: 2,
        p: 0.5,
        backgroundColor: `${
          theme.palette.mode === 'dark' ? 'transparent' : '#202833'
        }`,
      }}
    >
      <Typography
        sx={{
          flex: 1.5,
          fontWeight: 'bold',
          ...dynamicFontSize,
        }}
      >
        {objKey}:
      </Typography>
      <Typography sx={{ flex: 2, ...dynamicFontSize }}>
        {shortenString(value, 30)}
      </Typography>
    </Box>
  );
}
