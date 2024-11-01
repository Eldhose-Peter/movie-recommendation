// src/components/MovieCard.tsx
import React from "react";

interface Movie {
  id: number;
  title: string;
  year?: number;
  country?: string;
  genre?: string;
  director?: string;
  minutes?: number;
  poster?: string;
  rating?: number;
}

interface MovieCardProps {
  movie: Movie;
}

// Function to generate star rating display
const renderStars = (rating: number) => {
  const filledStars = Math.round(rating / 2);
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < filledStars ? "text-yellow-500" : "text-gray-300"}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.43 8.156 1.188-5.908 5.759 1.393 8.114L12 18.896l-7.309 3.84 1.393-8.114-5.908-5.759 8.156-1.188L12 .587z" />
      </svg>
    );
  }
  return stars;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img
        src={"/movie-tile.jpeg"}
        alt={`${movie.title} poster`}
        className="w-full h-32 object-cover"
      />
      <div className="px-4 py-2">
        <h2 className="font-semibold text-lg">{movie.title}</h2>
        <p className="text-gray-600 text-sm">Year: {movie.year}</p>
        <p className="text-gray-600 text-sm">Country: {movie.country}</p>
        <p className="text-gray-600 text-sm">Genre: {movie.genre}</p>
        <p className="text-gray-600 text-sm">Director: {movie.director}</p>
        <p className="text-gray-600 text-sm">Duration: {movie.minutes} minutes</p>
        <div className="flex items-center mt-2">
          {movie.rating !== undefined && (
            <>
              <span className="text-sm text-gray-700 mr-2">{movie.rating.toFixed(1)} / 10</span>{" "}
              {/* Display rating */}
              {renderStars(movie.rating)} {/* Render stars */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
