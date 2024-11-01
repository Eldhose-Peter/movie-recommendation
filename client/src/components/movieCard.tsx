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
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img src={"/movie-tile.jpeg"} alt={`${movie.title} poster`} className="w-full object-cover" />
      <div className="px-4 py-2">
        <h2 className="font-semibold text-lg">{movie.title}</h2>
        <p className="text-gray-600 text-sm">Year: {movie.year}</p>
        <p className="text-gray-600 text-sm">Country: {movie.country}</p>
        <p className="text-gray-600 text-sm">Genre: {movie.genre}</p>
        <p className="text-gray-600 text-sm">Director: {movie.director}</p>
        <p className="text-gray-600 text-sm">Duration: {movie.minutes} minutes</p>
      </div>
    </div>
  );
};

export default MovieCard;
