import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

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
            <Head>
              <link rel="icon" href="/favicons/favicon.ico" />
              <link
                rel="icon"
                href="/favicons/favicon-32x32.png"
                sizes="32x32"
              />
              <link
                rel="icon"
                href="/favicons/favicon-16x16.png"
                sizes="16x16"
              />
            </Head>
            <CssBaseline />
            <AppBar toggleTheme={toggleTheme} theme={theme} />
            <Component {...pageProps} />
          </ThemeProvider>
        </FeedbackProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

export default MyApp;
