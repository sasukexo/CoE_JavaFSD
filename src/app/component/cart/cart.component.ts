import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Movie[] = [];
  totalPrice: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCart();
  }

  
  loadCart() {
    this.apiService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

 
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price ?? 0), 0);

  }

 
  removeFromCart(movieId: number) {
    this.apiService.removeFromCart(movieId).subscribe(() => {
      this.loadCart();
    });
  }

  purchaseMovies() {
    if (this.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    this.apiService.bookMovies(this.cartItems).subscribe({
      next: () => {
        alert("Movies purchased successfully!");
        this.apiService.clearCart().subscribe(() => {
          this.cartItems = []; 
          window.location.reload(); 
        });
      },
      error: (err) => console.error("Error purchasing movies:", err)
    });
  }
  
}
  
