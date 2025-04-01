import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchases: Movie[] = [];
  totalSpent: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    this.apiService.getCartItems().subscribe(items => {
      this.purchases = items;
      this.calculateTotalSpent();
    });
  }

  calculateTotalSpent() {
    this.totalSpent = this.purchases.reduce((total, item) => total + (item.price ?? 0), 0);
  }
}
