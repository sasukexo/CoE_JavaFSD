import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchasedMovies: Movie[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPurchaseHistory();
  }

  loadPurchaseHistory() {
    this.apiService.getPurchaseHistory().subscribe({
      next: (data) => {
        console.log("Purchase History Data:", data);  // 🔥 Debug log
        this.purchasedMovies = data;
      },
      error: (err) => {
        console.error('Error fetching purchase history:', err);
      }
    });
  }
  
}
