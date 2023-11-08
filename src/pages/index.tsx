import { useEffect } from 'react';
import axios from 'axios';

export default function Index() {
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/shelf');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>Check Status</button>
    </>
  );
}
