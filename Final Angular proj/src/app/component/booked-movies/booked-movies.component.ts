import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-booked-movies',
  templateUrl: './booked-movies.component.html',
  styleUrls: ['./booked-movies.component.css']
})
export class BookedMoviesComponent implements OnInit {
  bookedMovies: Movie[] = [
    {
      id: 2,
      name: "Inception",
      genre: "Sci-Fi, Thriller",
      director: "Christopher Nolan",
      imdb: 8.9,
      price: 120,
      image: "assets/images/inception.png",
      rating: 8.9
    },
    {
      id: 1,
      name: "Interstellar",
      genre: "Sci-Fi, Drama",
      director: "Christopher Nolan",
      imdb: 9.0,
      price: 150,
      image: "assets/images/interstellar.png",
      rating: 9.0
    },
    {
      id: 3,
      name: "The Dark Knight",
      genre: "Action, Crime",
      director: "Christopher Nolan",
      imdb: 9.1,
      price: 130,
      image: "assets/images/dark-knight.png",
      rating: 9.1
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
