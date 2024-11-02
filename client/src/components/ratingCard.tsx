import { FaStar } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
  rating: number;
  onRate: (id: number, rating: number) => void;
  isSubmitted: boolean;
}

export function RatingCard({ movie, rating, onRate, isSubmitted }: MovieCardProps) {
  return (
    <div className="p-4 border rounded shadow-md flex flex-col items-center">
      <img src={"/movie-tile.jpeg"} alt={`${movie.title} Poster`} className="w-48 h-auto mb-2" />
      <h2 className="text-xl font-semibold">{movie.title}</h2>
      <p>
        {movie.year} • {movie.genre}
      </p>
      <p>Directed by: {movie.director}</p>
      <div className="flex space-x-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`cursor-pointer ${rating > index ? "text-yellow-400" : "text-gray-300"}`}
            onClick={() => onRate(movie.id, index + 1)}
            size={24}
          />
        ))}
      </div>
      {isSubmitted && <p className="text-green-500 text-sm mt-1">Rating submitted!</p>}
    </div>
  );
}
