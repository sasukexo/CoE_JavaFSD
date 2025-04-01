import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  isLoading = true; // ✅ Loading state

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    console.log('Movie ID:', movieId); // ✅ Debugging

    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (data: any) => {
          this.movie = {
            id: data.id,
            name: data.title, // ✅ TMDb uses `title` instead of `name`
            genre: data.genres.map((g: any) => g.name).join(', '), // ✅ Extract genres
            director: 'N/A', // ❌ TMDb doesn't provide a direct `director` field in this API
            image: `https://image.tmdb.org/t/p/w500/${data.poster_path}`, // ✅ Use TMDb image path
            imdb: data.vote_average, // ✅ Rating
            price: 0, // ❌ No price in API, default to 0
            rating: data.vote_average
          };
          this.isLoading = false; // ✅ Hide loading state
        },
        error: (err) => {
          console.error('Error fetching movie details:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Invalid movie ID');
      this.isLoading = false;
    }
  }
  
  addToCart(): void {
    if (this.movie) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(this.movie);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${this.movie.name} added to cart!`);
    }
  }
}
