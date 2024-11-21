export interface Movie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  video: boolean;
}

export interface Rating {
  rater_id: number;
  movie_id: number;
  rating: number;
  time: string;
}

export interface RatedMovie extends Movie {
  rating: number;
}
