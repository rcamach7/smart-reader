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
        title="My Favorited Books"
        buttonText="Search For More"
        buttonType="link"
        link="/search"
        handleButtonClick={() => {}}
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
        {user.savedBooks.map((book) => {
          return <BookCard book={book} type="transparent" />;
        })}
      </Box>
    </Box>
  );
}
