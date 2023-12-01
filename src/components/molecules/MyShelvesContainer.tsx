import { Box } from '@mui/material';
import { SectionHeader } from '@/components/atoms';
import { ShelfGallery } from '@/components/molecules';

import { UserType } from '@/types/index';

interface Props {
  shelves: UserType['shelves'];
  toggleCreateShelfModal: () => void;
}

export default function MyShelvesContainer({
  shelves,
  toggleCreateShelfModal,
}: Props) {
  return (
    <Box sx={{ px: 1 }}>
      <SectionHeader
        title="My Shelves"
        buttonText="Create New"
        handleButtonClick={toggleCreateShelfModal}
      />

      <Box
        sx={{
          mt: 1,
          p: 0.5,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {shelves.map((shelf, i) => {
          return <ShelfGallery shelf={shelf} key={i} />;
        })}
      </Box>
    </Box>
  );
}
