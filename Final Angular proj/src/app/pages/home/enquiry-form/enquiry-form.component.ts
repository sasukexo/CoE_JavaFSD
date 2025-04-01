import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrl: './enquiry-form.component.css'
})
export class EnquiryFormComponent {
  name: string = '';
  email: string = '';
  serviceType: string = '';
  message: string = '';
  errors:string[]=[]
 
  // I hard coded lol ... Yea I know it can be taken from api.json
  serviceTypes: string[] = [
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
 
  constructor(private api: ApiService) {}
  
  submitForm() {
    this.errors=[]
    let emailPattern = /^[a-zA-Z0-9\._]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    if(!this.name || this.name.length<3){
      this.errors.push("Name should be atleast three characters long")
    }
    if(!this.email || !emailPattern.test(this.email)){
      this.errors.push("Invalid Email")
    }
    if(!this.serviceType || this.serviceType.length==0){
      this.errors.push("Please select a service type")
    }
    if(!this.message || this.message.length<10){
      this.errors.push("Message should be atleast 10 characters long")
    }

    if(this.errors.length==0){
      this.api.addEnquiry({
        name: this.name,
        email: this.email,
        serviceType: this.serviceType,
        message: this.message
      }).subscribe({
          next: (response) => {
            console.log("Enquiry Form Response:", response);
            this.name = '';
            this.email = '';
            this.serviceType = '';
            this.message = '';
            alert("Enquiry Submitted Successfully")	
          },
          error: (error) => {
            alert("Something went wrong. Please try again")
         }});
    }
 
  }
}
