import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';


import { EnquiriesComponent } from './pages/enquiries/enquiries.component';
import { LoginComponent } from './common/login/login.component';
import { enquiryGuard } from './guards/enquiry.guard';
import { EnquiryFormComponent } from './pages/home/enquiry-form/enquiry-form.component';
import { MovieFormComponent } from './component/movie-form/movie-form.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { BookedMoviesComponent } from './component/booked-movies/booked-movies.component';
import { CartComponent } from './component/cart/cart.component';
import { PurchaseHistoryComponent } from './component/purchase-history/purchase-history.component';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'form', component: EnquiryFormComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'add-movie', component: MovieFormComponent, canActivate: [enquiryGuard] }, 
  { path: 'booked-movies', component: BookedMoviesComponent },  
  { path: 'cart', component: CartComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
 

  { path: 'enquiries', component: EnquiriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
