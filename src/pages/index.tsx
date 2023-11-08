import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Index() {
  const { data: session } = useSession();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/shelf');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      <br />
      <button onClick={handleSubmit}>Check Status</button>
    </>
  );
}
