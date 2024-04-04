import { Box } from '@mui/material';
import { SectionHeader } from '@/components/atoms';
import { BookCard } from '@/components/molecules';

import { UserType } from '@/types/index';

interface Props {
  user: UserType;
}

export default function FavoriteBooksContainer({ user }: Props) {
  return (
    <Box>
      <SectionHeader
        title="My Favorite Books"
        buttonText="Search For More"
        buttonType="link"
        link="/search"
      />
      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        {user.savedBooks.map((book, i) => {
          return <BookCard key={i} book={book} elevation={3} />;
        })}
      </Box>
    </Box>
  );
}
