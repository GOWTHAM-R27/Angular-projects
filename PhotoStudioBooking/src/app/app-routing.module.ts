import { ApplicationModule, Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { ProductComponent } from './Product/Product.component';
import { PreWeddingComponent } from './PreWedding/PreWedding.component';
import { WeddingComponent } from './wedding/wedding.component';
import { PortraitComponent } from './Portrait/Portrait.component';
import { EventsComponent } from './Events/Events.component';
import { TravelComponent } from './Travel/Travel.component';
import { BookNowComponent } from './BookNow/BookNow.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { LogincontrollsGuard } from './logincontrolls.guard';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { ProtectAdminGuard } from './protect-admin.guard';
import { PortfolioComponent } from './Portfolio/Portfolio.component';




const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  {
    path:'home',
    component: HomeComponent,
  },

  {
    path:'login',
    component: LoginComponent,
    canActivate:[LogincontrollsGuard]
  },
  {
    path:'forgotpassword',
    component: ForgotPasswordComponent,
  },


  {
    path:'register',
    component: RegisterComponent,
    canActivate:[LogincontrollsGuard]
  },


  {
    path:'gallery',
    component: GalleryComponent,

  },

  {
    path:'pre_wedding',
    component: PreWeddingComponent,

  },
  {
    path:'admin',
    component: AdminComponent,
    canActivate:[AdminGuard]

  },

  {
    path:'wedding',
    component: WeddingComponent,

  },

  {
    path:'portrait',
    component: PortraitComponent,

  },

  {
    path:'products',
    component: ProductComponent,

  },


  {
    path:'events',
    component: EventsComponent,

  },
  {
    path:'travel',
    component: TravelComponent,

  },
  {
    path:'booknow',
    component: BookNowComponent,
    canActivate:[AuthGuard,ProtectAdminGuard]

  },
  {
    path:'profile',
    component: ProfileComponent,

    canActivate:[AuthGuard]

  },
  {
    path:'portfolio',
    component: PortfolioComponent
  },
  {
    path:'**',
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
