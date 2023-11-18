import '../theme/globals.css';
import { UserProvider } from '@/context/UserContext';
import { AppBar } from '@/components/organisms';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <AppBar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
