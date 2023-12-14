import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { UserProvider } from '@/context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { FeedbackProvider } from '@/context/FeedbackContext';
import useTheme from '@/hooks/useTheme';

import { AppBar } from '@/components/organisms';
import { lightTheme, darkTheme } from '../theme/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <UserProvider>
      <LoadingProvider>
        <FeedbackProvider>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <AppBar toggleTheme={toggleTheme} />
            <Component {...pageProps} />
          </ThemeProvider>
        </FeedbackProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

export default MyApp;
