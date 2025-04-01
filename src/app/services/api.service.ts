import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { switchMap, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4500';

  constructor(private http: HttpClient) {}

  // --- Contact & Service API Calls ---
  getContacts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contacts`);
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/services`);
  }

  getDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/details?id=${id}`);
  }

  // --- Enquiries API Calls ---
  addEnquiry(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/enquiries`, data);
  }

  getEnquiries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enquiries`);
  }

  addEnquiryReply(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/enquiryresponses`, data);
  }

  // --- Project API Calls ---
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie);
  }

  // --- Cart API Calls ---
  addToCart(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/cart`, movie);
  }

  getCartItems(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/cart`);
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${id}`);
  }

  // ✅ Move purchased movies to bookedMovies
  bookMovies(movies: Movie[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bookedMovie`, movies);
  }

  // ✅ Clear Cart after purchase
  clearCart(): Observable<void> {
    return this.http.get<Movie[]>(`${this.apiUrl}/cart`).pipe(
      switchMap((cartItems) =>
        forkJoin(cartItems.map((item) => this.http.delete<void>(`${this.apiUrl}/cart/${item.id}`)))
      ),
      map(() => undefined) // Ensure method completes correctly
    );
  }

  // ✅ Get booked movies for display
  getBookedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/bookedmovies`);
  }

  addBookedMovie(movie: Movie): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/bookedMovie`).pipe(
      map((bookedMovies) => [...bookedMovies, movie]), // Append new movie to the array
      switchMap((updatedMovies) =>
        this.http.put<Movie[]>(`${this.apiUrl}/bookedMovie`, updatedMovies)
      )
    );
  }

  // --- Purchase API Calls ---
  purchaseMovies(cartItems: Movie[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/purchases`, { items: cartItems });
  }

  getPurchaseHistory(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/purchased`);
  }
}
