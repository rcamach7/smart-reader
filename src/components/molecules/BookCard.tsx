import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from '@mui/material';
import { FavoriteBookButton } from '@/components/atoms';
import { ShelfSelectionMenu } from '@/components/molecules';

import { shortenString } from '@/utils/helpers';
import Book from '@/types/book';

import Link from 'next/link';

interface Props {
  book: Book;
  type?: 'transparent';
}

export default function BookCard({ book, type }: Props) {
  return (
    <Card
      sx={{
        width: 133,
        pt: 0.5,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: type === 'transparent' ? 'transparent' : 'default',
      }}
    >
      <Link href={`/book/${book.googleId}`}>
        <CardActionArea>
          <CardMedia
            sx={{
              paddingTop: '120%',
              backgroundSize: 'contain',
            }}
            image={book.imageLinks?.smallThumbnail}
            title={book.title}
          />
        </CardActionArea>
      </Link>
      <CardContent
        sx={{
          p: 0,
          mb: 0,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          component="div"
          textAlign="center"
          sx={{
            display: { xs: 'none', sm: 'block' },
            p: 0,
            px: 0.5,
            fontSize: 14,
          }}
        >
          {shortenString(book.title, 30)}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          p: 0,
          mt: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FavoriteBookButton book={book} type="card" />
        <ShelfSelectionMenu type="card" />
      </CardActions>
    </Card>
  );
}
