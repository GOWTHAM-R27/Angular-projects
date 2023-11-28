import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Travel',
  templateUrl: './Travel.component.html',
  styleUrls: ['./Travel.component.css']
})
export class TravelComponent implements OnInit {

  prices: any = {};

  constructor( private service:ServiceService,private logger:LoggerService) { }

  ngOnInit() {
    // this.fetchPrice();
    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    });

    this.logger.log("Travel packages fetch successfully")
  }
  bookNow() {
    var data={category:"Travel",photo:this.prices[5]?.TravelPhoto, video:this.prices[5]?.TravelVideo}
    this.service.setCategoryName(data); // Set category name here
  }

}
