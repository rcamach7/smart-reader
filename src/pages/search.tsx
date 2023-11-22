import { useRouter } from 'next/router';
import { useState } from 'react';

import { Box, InputBase } from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardVoice as KeyboardVoiceIcon,
} from '@mui/icons-material';

import useAvailableHeight from '@/hooks/useAvailableHeight';

export default function SearchBooksPage() {
  const availableHeight = useAvailableHeight();
  const router = useRouter();
  const { query, type } = router.query;

  const [search, setSearch] = useState({
    query: query ? query : '',
    type: type ? type : 'books',
  });

  return (
    <Box
      sx={{
        height: availableHeight,
        display: 'flex',
        justifyContent: 'center',
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'clamp(200px, 80vw, 500px)',
          height: 50,
          border: 'solid black 2px',
          borderRadius: '20px',
          px: 1,
        }}
      >
        <SearchIcon />
        <InputBase
          placeholder={`Search ${search.type}`}
          sx={{
            flex: 1,
            pl: 1,
            border: 'red black 2px',
          }}
          value={search.query}
          onChange={(e) => {
            setSearch((S) => {
              return {
                ...S,
                query: e.target.value,
              };
            });
          }}
        />
        <KeyboardVoiceIcon sx={{ ml: 'auto' }} />
      </Box>
    </Box>
  );
}
