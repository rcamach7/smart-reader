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
    objKey = 'Print Type:';
  } else {
    if (objKey !== 'isbn' && objKey !== 'isbn13') {
      objKey = objKey.substring(0, 1).toUpperCase().concat(objKey.substring(1));
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{ flex: 1 }}>{objKey}:</Typography>
      <Typography sx={{ flex: 2 }}>{shortenString(value, 30)}</Typography>
    </Box>
  );
}
