import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  function handleSubmit(e) {
    axios.post('/register', credentials);
  }

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  }

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  return (
    <div>
      <h1>Register</h1>
      <form action="put" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
