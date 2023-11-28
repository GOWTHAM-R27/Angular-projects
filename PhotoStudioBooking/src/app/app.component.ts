import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from './service.service';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PhotoStudioBooking';

  // display Username
  public data: any;
  constructor(public currentlogin: ServiceService, public router: Router, public logger:LoggerService) {
    var values = JSON.parse(localStorage.getItem('userdata')+"");
    currentlogin.load(values);
  }

  //logout
  public logout() {
    if (confirm('Confirm logout')) {
      localStorage.clear();
      this.currentlogin.load(null);
      this.router.navigate(['/']);
    }
  }
  // highlight the curret page
  isCurrentPage(pageUrl: string): boolean {
    return this.router.url === pageUrl;
  }
ngOnInit(){
  this.logger.log("User details fetch successfully")
}


}
