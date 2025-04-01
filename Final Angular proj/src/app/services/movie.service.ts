import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '9f12674e1fdd688cbc85ae7f16b11b15'; // Replace with your TMDb API Key
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }
  getMovieById(movieId: string): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    console.log('Fetching movie from:', url); // ✅ Debugging
    return this.http.get<Movie>(url);
  }
  

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=credits`);
  }
}
