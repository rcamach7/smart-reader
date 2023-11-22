import axios from 'axios';

type TopHeadlineParams = {
  country?: string;
  category: string;
  pageSize: number;
};

type parameters = 'intitle' | 'inauthor' | 'isbn' | 'insubject' | 'inpublisher';

export default class GoogleBooksAPI {
  private static _URL = 'https://www.googleapis.com/books/v1';
  private readonly _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  async findBooksByQuery(query: string) {
    const endpoint = `${GoogleBooksAPI._URL}/volumes?q=${query}&key=${this._apiKey}`;

    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch top headlines:', error);
      throw new Error('Failed to fetch top headlines.');
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
}
