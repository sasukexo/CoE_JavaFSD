import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './common/menu-bar/menu-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactItemComponent } from './pages/contact/contact-item/contact-item.component';

import { EnquiryFormComponent } from './pages/home/enquiry-form/enquiry-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnquiriesComponent } from './pages/enquiries/enquiries.component';
import { LoginComponent } from './common/login/login.component';

import { FilterservicePipe } from './pipes/filterservice.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { MovieFormComponent } from './component/movie-form/movie-form.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { AddMovieComponent } from './component/add-movie/add-movie.component';
import { CartComponent } from './component/cart/cart.component';
import { PurchaseComponent } from './component/purchase/purchase.component';
import { BookedMoviesComponent } from './component/booked-movies/booked-movies.component';
import { PurchaseHistoryComponent } from './component/purchase-history/purchase-history.component';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    ContactItemComponent,
    
    EnquiryFormComponent,
    EnquiriesComponent,
    LoginComponent,
  
    FilterservicePipe,
    HighlightPipe,
    MovieFormComponent,
    MovieListComponent,
    AddMovieComponent,
    CartComponent,
    PurchaseComponent,
    BookedMoviesComponent,
    PurchaseHistoryComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
