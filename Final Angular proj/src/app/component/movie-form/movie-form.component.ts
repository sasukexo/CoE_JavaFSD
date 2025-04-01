import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  movieForm: FormGroup;
  genres: string[] = ["Sci-Fi", "Thriller", "Action", "Drama", "Crime", "Romance", "Fantasy", "Adventure"];
  selectedImage: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // ✅ Initialize FormGroup in Constructor
    this.movieForm = this.fb.group({
      id: [null], // ✅ Optional if API auto-generates it
      name: ['', Validators.required],
      genre: ['', Validators.required],
      director: ['', Validators.required],
      imdb: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: [null, Validators.required]
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.movieForm.patchValue({ image: this.selectedImage });
      };
    }
  }

  submitForm() {
    if (this.movieForm.invalid) {
      return;
    }

    const movieData = this.movieForm.value;

    this.apiService.addMovie(movieData).subscribe({
      next: () => {
        alert('Movie added successfully!');

        // ✅ Correctly Reset Form and Image Preview
        this.movieForm.reset({
          id: null, // Reset ID if applicable
          name: '',
          genre: '',
          director: '',
          imdb: '',
          price: '',
          image: null
        });
        this.selectedImage = null;
      },
      error: (err) => console.error('Error adding movie:', err)
    });
  }
}
