import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';

import { RegisterComponent } from './Register/Register.component';
import { PreWeddingComponent } from './PreWedding/PreWedding.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './Product/Product.component';
import { WeddingComponent } from './wedding/wedding.component';
import { PortraitComponent } from './Portrait/Portrait.component';

import { EventsComponent } from './Events/Events.component';

import { TravelComponent } from './Travel/Travel.component';
import { BookNowComponent } from './BookNow/BookNow.component';
import { LoginComponent } from './Login/Login.component';
import { ReactiveFormsModule} from '@angular/forms';

import { GalleryComponent } from './gallery/gallery.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { PortfolioComponent } from './Portfolio/Portfolio.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      RegisterComponent,
      PreWeddingComponent,
      ProductComponent,
      WeddingComponent,
      PortraitComponent,
      EventsComponent,
      TravelComponent,
      BookNowComponent,
      LoginComponent,
      GalleryComponent,
      AdminComponent,
      ForgotPasswordComponent,
      PortfolioComponent,
      ProfileComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
