import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectAdminGuard implements CanActivate {
  constructor(private loginservice:ServiceService, private router:Router){
  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {

    if(this.loginservice.isadmin()){
      alert("You are logged in as admin...you are not able to booking this studio");
      this.router.navigate(['/'],{queryParams:{retUrl:route.url}});
      return false;
    }

    return true;


  }

}
