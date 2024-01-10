import React from 'react';

import { Fab } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';

interface Props {
  onClick: () => void;
}

export default function FabButton({ onClick }: Props) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
      onClick={onClick}
    >
      <SmartToyIcon />
    </Fab>
  );
}
