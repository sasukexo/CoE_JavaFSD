import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTrendingMovies().subscribe(response => {
      const uniqueMovies = new Map(); // ✅ Use a Map to store unique movies
      response.results.forEach((movie: any) => {
        uniqueMovies.set(movie.id, {
          id: movie.id,
          name: movie.title,
          genre: movie.genre || 'Unknown',
          director: movie.director || 'Unknown',
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'assets/images/default-movie.jpg',
          imdb: movie.vote_average || 'N/A',
          price: Math.floor(Math.random() * 500) + 100, // Random price for UI
          rating: movie.vote_average || 'N/A'
        });
      });

      this.movies = Array.from(uniqueMovies.values()); // ✅ Convert Map to Array
    });
  }

  addToCart(movie: Movie): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Prevent duplicates in the cart
    if (!cart.some((m: Movie) => m.id === movie.id)) {
      cart.push(movie);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${movie.name} added to cart successfully!`);
    } else {
      alert(`${movie.name} is already in the cart!`);
    }
  }
  trackByMovieId(index: number, movie: Movie): number {
    return movie.id; // Ensures Angular tracks only unique movie IDs
  }
}
