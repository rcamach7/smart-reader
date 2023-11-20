import { Box } from '@mui/material';

import useAvailableHeight from '@/hooks/useAvailableHeight';
import { useUser } from '@/context/UserContext';

export default function Account() {
  const { user, setUser } = useUser();
  const availableHeight = useAvailableHeight();

  if (!user) {
    return null;
  }
  return (
    <Box
      style={{
        height: availableHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          width: '100px',
          height: '100px',
          boxShadow: '20px 20px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <img
          src={`/profile/${user.profileImage}`}
          alt="User Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
}
