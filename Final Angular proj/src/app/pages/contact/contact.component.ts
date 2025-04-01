import { Component } from '@angular/core';
import {Contact} from '../../model/contact';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactlist:Contact[]=[]

  constructor(private as:ApiService) { }
  
  ngOnInit(): void {
    //ngOnInit is a lifecycle hook
    //  that is called after Angular component is created(constructor) and Input elements received
    // Define an ngOnInit() method to handle any additional initialization tasks.
    this.as.getContacts().subscribe({
         next:(result:Contact[])=>{this.contactlist=result},
         error:(err:any)=>{console.log(err)}
    })
 }
}