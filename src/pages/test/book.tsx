import React from 'react';
import axios from 'axios';

const CreateBookPage = () => {
  const handleCreateBook = async () => {
    const newBookData = {
      title: 'Sample Book Title',
      subTitle: 'A Brief Introduction',
      authors: ['John Doe', 'Jane Doe'],
      publisher: 'Sample Publisher',
      publicationDate: new Date(),
      edition: '1st',
      description: 'This is a sample book description.',
      pageCount: 200,
      coverImageLinks: {
        small: 'http://example.com/small.jpg',
        normal: 'http://example.com/normal.jpg',
      },
      genre: [],
    };

    try {
      const response = await axios.post('/api/book', newBookData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Book</h1>
      <button onClick={handleCreateBook}>Create Book</button>
    </div>
  );
};

export default CreateBookPage;
