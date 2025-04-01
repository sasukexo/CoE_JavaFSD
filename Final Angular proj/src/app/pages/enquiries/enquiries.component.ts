import { Component } from '@angular/core';
import { enquiry } from '../../model/enquiry';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.css'
})
export class EnquiriesComponent {
  enquirylist: enquiry[] = [];

  serviceTypes: string[] =[
    "all",
   "Sci-Fi, Thriller",
    "Action, Crime, Drama",
    "Sci-Fi, Adventure, Drama",
    "Action, Sci-Fi, Adventure",
    "Thriller, Drama",
    "Crime, Drama, Thriller",
    "Romance, Drama",
    "Drama",
    "Crime, Drama",
    "Fantasy, Adventure"
  ];
  selected: string = 'all';  

    constructor(private api:ApiService){

    }
  
    ngOnInit(){ 
       this.api.getEnquiries().subscribe({
         next: (response:enquiry[]) => {
           this.enquirylist = response;
         },
         error: (error) => {
           console.log("Error while fetching enquiries", error);
         }
    })
  }
  
}
