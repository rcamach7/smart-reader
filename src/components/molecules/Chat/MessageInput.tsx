import { InputBase } from '@mui/material';

interface Props {}

export default function MessageInput({}: Props) {
  return (
    <InputBase
      placeholder={`Ask Question`}
      inputProps={{ 'aria-label': 'message' }}
    />
  );
}
