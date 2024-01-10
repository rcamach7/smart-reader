import { useState } from 'react';

import { Box } from '@mui/material';
import { FabButton } from '@/components/atoms';

interface Props {}

export default function Chat({}: Props) {
  const [chat, setChat] = useState({ open: false, messages: [] });

  const toggleChat = () => {
    setChat((C) => {
      return { ...C, open: !C.open };
    });
  };

  return (
    <>
      <FabButton onClick={() => toggleChat()} />
      {chat.open ? <Box>Chat Popup</Box> : null}
    </>
  );
}
