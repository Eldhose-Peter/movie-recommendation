import { RatingCard } from "@/components/ratingCard";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  year: number;
  country: string;
  genre: string;
  director: string;
  minutes: number;
  poster: string;
}

interface MoviesResponse {
  movies: Movie[];
}

export default function RateMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [submittedRatings, setSubmittedRatings] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/movies/average?minimalRatings=50"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data: MoviesResponse = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const submitRating = async (id: number, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating
    }));

    try {
      const response = await fetch(`YOUR_API_URL_TO_SUBMIT_RATING/${id}`, {
        // replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating })
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      setSubmittedRatings((prev) => ({
        ...prev,
        [id]: true
      }));

      console.log("Rating submitted successfully for movie ID:", id);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl ">Rate Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <RatingCard
            key={movie.id}
            movie={movie}
            rating={ratings[movie.id] || 0}
            onRate={submitRating}
            isSubmitted={!!submittedRatings[movie.id]}
          />
        ))}
      </div>
    </div>
  );
}
