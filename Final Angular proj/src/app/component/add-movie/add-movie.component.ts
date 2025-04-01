import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  // ✅ If API auto-generates ID, do not include it here
  movie: Movie = { id: 0, name: '', genre: '', director: '', image: '', imdb: 0, price: 0 ,rating: 0};

  constructor(private apiService: ApiService) {}

  addMovie() {
    this.apiService.addMovie(this.movie).subscribe(() => {
      alert('Movie added successfully!');
      // ✅ Reset with correct structure
      this.movie = { id: 0, name: '', genre: '', director: '', image: '', imdb: 0, price: 0, rating: 0 };
    });
  }
}
