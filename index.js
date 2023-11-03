const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

// Array for Movies
let movies = [
  {
    id: 1,
    title: 'Movie 1',
    description: 'Description of Movie 1',
    genre: 'Genre 1',
    director: 'Director 1',
    imageUrl: 'URL 1',
    featured: true,
  },
  {
    id: 2,
    title: 'Movie 2',
    description: 'Description of Movie 2',
    genre: 'Genre 2',
    director: 'Director 2',
    imageUrl: 'URL 2',
    featured: false,
  },
  // Add more movie objects as needed
];

// Array for Users
let users = [
  {
    id: 1,
    email: 'user1@example.com',
    favorites: [1, 3], // Movie IDs of their favorite movies
  },
  {
    id: 2,
    email: 'user2@example.com',
    favorites: [2, 4],
  },
  // Add more user objects as needed
];


// Gets the list of all movies

app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets the data about a single movie, by title

app.get('/movies/:title', (req, res) => {
  const movie = movies.find((m) => m.title === req.params.title);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found.');
  }
});


// Adds data for a new movie to their list of favorites.
app.post('/users/:userId/favorites/:movieId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      res.send('Movie added to favorites.');
    } else {
      res.send('Movie already in favorites.');
    }
  } else {
    res.status(404).send('User not found.');
  }
});


// Remove a movie from their list of favorites
app.delete('/users/:userId/favorites/:movieId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    if (user.favorites.includes(movieId)) {
      user.favorites = user.favorites.filter((id) => id !== movieId);
      res.send('Movie removed from favorites.');
    } else {
      res.send('Movie not found in favorites.');
    }
  } else {
    res.status(404).send('User not found.');
  }
});

app.listen(8081, () => {
  console.log('Your app is listening on port 8081');
});



