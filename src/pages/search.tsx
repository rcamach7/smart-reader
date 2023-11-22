import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  InputBase,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
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

  const searchTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (!newAlignment) {
      return;
    }
    setSearch((S) => {
      return {
        ...S,
        type: newAlignment,
      };
    });
  };

  return (
    <Box
      sx={{
        height: availableHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: 'clamp(350px, 80vw, 600px)',
          height: { xs: 100, sm: 125 },
          position: 'relative',
          borderRadius: '15px',
        }}
      >
        <img
          src="/search/books.png"
          alt="books in shelf"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '25%',
            maxWidth: 250,
          }}
        >
          <Typography
            textAlign="center"
            variant="h4"
            sx={{
              color: 'white',
              fontFamily: 'Verdana',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
              fontSize: { xs: 40, md: 45 },
            }}
          >
            Explore
          </Typography>
        </Box>
      </Box>
      <ToggleButtonGroup
        color="primary"
        value={search.type}
        aria-label="search-type"
        onChange={searchTypeChange}
        exclusive
        size="small"
        sx={{ my: 1 }}
      >
        <ToggleButton value="books">books</ToggleButton>
        <ToggleButton value="shelves">shelves</ToggleButton>
      </ToggleButtonGroup>

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
