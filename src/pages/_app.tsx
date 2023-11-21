import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { UserProvider } from '@/context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { FeedbackProvider } from '@/context/FeedbackContext';

import { AppBar } from '@/components/organisms';
import theme from '../theme/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <LoadingProvider>
        <FeedbackProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </FeedbackProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

export default MyApp;
