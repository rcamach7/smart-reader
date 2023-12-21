import Link from 'next/link';
import { Typography, MenuItem } from '@mui/material';

interface Props {
  link: string;
  onClickHandler?: () => void;
  text: string;
  type?: 'menuItem' | 'text';
}

export default function LinkItem({ link, onClickHandler, text, type }: Props) {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  };

  if (type === 'menuItem') {
    return (
      <Link href={link}>
        <MenuItem onClick={onClickHandler}>
          <Typography textAlign="center">
            <a style={linkStyle}>{text}</a>
          </Typography>
        </MenuItem>
      </Link>
    );
  } else {
    return (
      <Link href={link}>
        <Typography textAlign="center">
          <a style={linkStyle}>{text}</a>
        </Typography>
      </Link>
    );
  }
}
