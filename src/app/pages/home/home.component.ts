import { Component } from '@angular/core';
import { service } from '../../model/service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  servicelist:service[] = [];
    constructor(private as: ApiService) { }

    ngOnInit(): void {
      this.as.getServices().subscribe({
        next:(data: any) => {
        this.servicelist = data;
        },
        error:(err: any) => {
          console.log(err);
        }
    });
    }
}
