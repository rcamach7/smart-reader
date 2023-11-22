import axios from 'axios';

type Identifier = {
  type: 'ISBN_10' | 'ISBN_13';
  identifier: string;
};

type GoogleBook = {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: Date;
    industryIdentifiers: Identifier[];
    printType: string;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
  };
};

type QueryResponse = {
  data: {
    kind: string;
    totalItems: number;
    items: GoogleBook[];
  };
};

type parameters = 'intitle' | 'inauthor' | 'isbn' | 'insubject' | 'inpublisher';

export default class GoogleBooksAPI {
  private static _URL = 'https://www.googleapis.com/books/v1';
  private readonly _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  async findBooksByQuery(query: string, maxResults?: number) {
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `${
      GoogleBooksAPI._URL
    }/volumes?q=${encodedQuery}&maxResults=${
      maxResults ? maxResults : 50
    }&key=${this._apiKey}`;

    try {
      const response: QueryResponse = await axios.get(endpoint);

      const books = response.data.items.map(this.mapGoogleBookToInternalFormat);
      return books;
    } catch (error) {
      console.error('Failed to fetch by query', error);
      throw new Error('Failed to fetch by query');
    }
  }

  async findBookByISBN(query: string) {
    const endpoint = `${GoogleBooksAPI._URL}/volumes?q=isbn:${query}&key=${this._apiKey}`;
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch by ISBN');
    }
  }

  private mapGoogleBookToInternalFormat({ id, selfLink, volumeInfo }) {
    const {
      previewLink,
      infoLink,
      title,
      authors,
      categories,
      imageLinks,
      industryIdentifiers,
      language,
      printType,
      publishedDate,
      publisher,
    } = volumeInfo;
    const isbn = industryIdentifiers?.find((id) => id.type === 'ISBN_10')
      ?.identifier;
    const isbn13 = industryIdentifiers?.find((id) => id.type === 'ISBN_13')
      ?.identifier;

    return {
      googleId: id,
      googleSelfLink: selfLink,
      previewLink,
      title,
      infoLink,
      authors,
      categories,
      imageLinks,
      language,
      printType,
      publishedDate,
      publisher,
      isbn,
      isbn13,
    };
  }
}
