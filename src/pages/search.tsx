import { useRouter } from 'next/router';

export default function SearchBooksPage() {
  const router = useRouter();
  const { query } = router.query; // Extracts 'query' from the URL

  return (
    <div>
      <h1>Search Results</h1>
      <p>Searching for: {query}</p>
      {/* Render your search results here */}
    </div>
  );
}
