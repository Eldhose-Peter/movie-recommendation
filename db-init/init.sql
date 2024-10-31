-- Connect to the node-postgres-demo database
\c node-postgres-demo;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT,
    country TEXT,
    genre TEXT,
    director TEXT,
    minutes INT,
    poster TEXT
);

-- Load the CSV data into the movies table
COPY movies(id, title, year, country, genre, director, minutes, poster)
FROM '/docker-entrypoint-initdb.d/ratedmoviesfull.csv' -- replace with your actual file path
DELIMITER ','
CSV HEADER;

-- Create the ratings table
CREATE TABLE ratings (
    rater_id INT,
    movie_id VARCHAR(20),
    rating INT NOT NULL,
    time TEXT,
    PRIMARY KEY (rater_id, movie_id)
);

ALTER TABLE ratings
ADD CONSTRAINT ratings_rating_check CHECK (rating >= 0 AND rating <= 10); 

-- Load the CSV data into the ratings table
COPY ratings(rater_id, movie_id, rating, time)
FROM '/docker-entrypoint-initdb.d/ratings.csv' -- replace with your actual file path
DELIMITER ','
CSV HEADER;

