import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginservice:ServiceService, private router:Router){
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {

    if(!this.loginservice.isadmin()){
      alert("You are not logged in as admin to access the page");
      this.router.navigate(['/'],{queryParams:{retUrl:route.url}});
      return false;
    }
    
    return true;


  }



}
