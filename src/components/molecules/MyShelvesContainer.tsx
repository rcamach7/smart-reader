import { Box } from '@mui/material';
import { SectionHeader } from '@/components/atoms';

import { UserType } from '@/types/index';

interface Props {
  shelves: UserType['shelves'];
}

export default function MyShelvesContainer({ shelves }: Props) {
  return (
    <Box>
      <SectionHeader
        title="My Shelves"
        buttonText="Create New"
        handleButtonClick={() => {}}
      />
    </Box>
  );
}
