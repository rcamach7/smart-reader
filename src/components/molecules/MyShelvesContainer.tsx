import { Box } from '@mui/material';
import { SectionHeader } from '@/components/atoms';

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
    </Box>
  );
}
