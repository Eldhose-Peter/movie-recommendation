export interface Movie {
  id: number;
  title: string;
  year?: number;
  country?: string;
  genre?: string;
  director?: string;
  minutes?: number;
  poster?: string;
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
