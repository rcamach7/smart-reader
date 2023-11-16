import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

function ShelfForm() {
  const { user, setUser } = useUser();

  const [shelfData, setShelfData] = useState({
    name: '',
    description: '',
    isPublic: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShelfData({
      ...shelfData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/shelf', shelfData, {
        withCredentials: true,
      });

      setUser({
        ...user,
        shelves: response.data.shelves,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating shelf:', error);
      console.log(error.response);
    }
  };

  const handleDeleteShelf = async (_id: string) => {
    try {
      const res = await axios.delete('/api/shelf/' + _id);
      setUser({
        ...user,
        shelves: res.data.shelves,
      });
      console.log(res);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <>
      {user ? (
        <>
          <p>My Current Shelves:</p>
          {user.shelves.map(({ _id, name }) => (
            <div key={_id}>
              <p style={{ display: 'inline' }}>{`${name} : ${_id}`}</p>
              <button
                onClick={() => {
                  handleDeleteShelf(_id);
                }}
                style={{ display: 'inline', marginLeft: 5 }}
              >
                Delete Shelf
              </button>
            </div>
          ))}

          <br />
          <p>Create New Shelf Below</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={shelfData.name}
              onChange={handleChange}
              placeholder="Shelf Name"
            />
            <textarea
              name="description"
              value={shelfData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <label>
              Public
              <input
                type="checkbox"
                name="isPublic"
                checked={shelfData.isPublic}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Create Shelf</button>
          </form>
        </>
      ) : (
        <h1>Please sign in to create a shelf</h1>
      )}
    </>
  );
}

export default ShelfForm;
