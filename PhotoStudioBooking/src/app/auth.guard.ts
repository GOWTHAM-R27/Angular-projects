import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginservice:ServiceService, private router:Router){
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {

    if(!this.loginservice.islogin()){
      alert("You are not logged in");
      this.router.navigate(['login'],{queryParams:{retUrl:route.url}});
      return false;
    }
    return true;
  }


}
