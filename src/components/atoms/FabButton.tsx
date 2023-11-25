import React from 'react';
import Fab from '@mui/material/Fab';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function FabButton() {
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
    >
      <SmartToyIcon />
    </Fab>
  );
}
