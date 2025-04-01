import { Component, Input } from '@angular/core';
import { Contact } from '../../../model/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
   @Input() contact: Contact = {
      id: '',
      name: '',
      moviename: '',
      genre: '',
      rating: '',
      review: '',
      image: ''
    }
}
