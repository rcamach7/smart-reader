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
    <Box>
      <SectionHeader
        title="My Shelves"
        buttonText="Create New"
        handleButtonClick={toggleCreateShelfModal}
      />

      <Box sx={{ p: 0.5 }}>
        {shelves.map((shelf, i) => {
          return <ShelfGallery shelf={shelf} key={i} />;
        })}
      </Box>
    </Box>
  );
}
