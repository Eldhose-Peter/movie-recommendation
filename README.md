# Movie Recommendation
A Web app which calculates movie recommendations based on user similarity. It uses collaborative filtering, specifically a dot product for rating comparison, to determine the closeness between raters and recommend movies that similar users have rated highly. 

## Technologies used
- Node Backend
- Postgres DB
- NextJS UI
- Typescript
- Docker

## Pre-requisites

- node -> v22 LTS
- docker
- .env file, refer .env.example

## Similarity algorithm

### Key Components:
#### Dot Product
- A mathematical operation that helps measure similarity between two users based on their ratings.
- User Similarity: The core of the algorithm is finding users who rate similarly to the current user. This is done through the dot product calculation, which provides a numeric representation of similarity.

*Dot Product Calculation*
- if user1 has given a rating of 4 (in a scale of 10)
- if user2 has given a rating of 8 (in a scale of 10)
- on reducing the scale to (-5 to 5)
- user1 has rated -1
- user2 has rated 4
- Then their dot product will be -4.
- Since the similarity value is negative we can say that the users are dissimilar.

- A higher dot product indicates greater similarity.


#### Weighted Averages
- The algorithm uses ratings from similar users to suggest movies, weighting those ratings by the similarity scores.
- Leveraging Similar User Ratings: Once similar users are identified, their ratings are used to recommend movies that the current user has not rated yet. The weighting by similarity score ensures that ratings from users who are more similar to the current user have a greater influence on the recommendations.

*Weighted Average Calculation*
- If a user has rated the movie, compute the weighted rating as the product of the other user's similarity score and their rating.



## Starting project

Building backend Node Application
- `npm install`
- `npm run prestart`
- `npm run build`
- `npm run start`
- `docker compose up`
- refer README in /client to build NextJS UI