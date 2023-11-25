import { Box, Typography } from '@mui/material';
import { shortenString } from '@/utils/helpers';

interface Props {
  objKey: string;
  value: string;
}

export default function BookDetailLine({ objKey, value }: Props) {
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
    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: 310,
        alignItems: 'center',
        borderBottom: 'solid black 1px',
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
