import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

import { UserProvider } from '@/context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { FeedbackProvider } from '@/context/FeedbackContext';

import { AppBar } from '@/components/organisms';
import { primaryTheme } from '../theme/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <LoadingProvider>
        <FeedbackProvider>
          <ThemeProvider theme={primaryTheme}>
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
            <AppBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </FeedbackProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

export default MyApp;
