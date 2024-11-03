// src/app/page.tsx
import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import { useRouter } from "next/router";
import Filter from "../components/Filter"; // Import the new Filter component

interface Movie {
  id: number;
  title: string;
  year?: number;
  country?: string;
  genre?: string;
  director?: string;
  minutes?: number;
  poster?: string;
}

export default function Page() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies based on query parameters
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(window.location.search);
      const response = await fetch(
        `http://localhost:3000/api/v1/movies/average?${query.toString()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.movies);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch movies if query parameters exist (e.g., on initial page load)
    if (router.isReady) fetchMovies();
  }, [router.isReady]);

  // Update query parameters and fetch movies on filter apply
  const applyFilters = (filters: {
    searchTerm: string;
    genre: string;
    yearAfter: number | "";
    minMinutes: number | "";
    minimalRatings: number | "";
  }) => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
    if (filters.genre) params.set("genre", filters.genre);
    if (filters.yearAfter) params.set("yearAfter", filters.yearAfter.toString());
    if (filters.minMinutes) params.set("minMinutes", filters.minMinutes.toString());
    if (filters.minimalRatings) params.set("minimalRatings", filters.minimalRatings.toString());

    // Push new URL with query parameters
    router.push({
      pathname: "/",
      query: params.toString()
    });

    // Fetch movies with updated query parameters
    fetchMovies();
  };

  return (
    <div className="flex-grow justify-items-center p-4">
      <h1 className="text-3xl mb-4">Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Filter Component */}
      <Filter onApply={applyFilters} />

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
