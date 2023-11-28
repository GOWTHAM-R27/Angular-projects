import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Portrait',
  templateUrl: './Portrait.component.html',
  styleUrls: ['./Portrait.component.css']
})
export class PortraitComponent implements OnInit {

  prices: any = {};

  constructor( private service:ServiceService,private logger:LoggerService) { }

  ngOnInit() {
    // this.fetchPrice();
    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    });
    this.logger.log("Portrait packages fetch successfully")
  }

  bookNow() {
    var data={category:"Portrait",photo:this.prices[2]?.PortraitPhoto, video:this.prices[2]?.PortraitVideo}
    this.service.setCategoryName(data);
  }

  // fetchPrice() {
  //   this.fetchPrices.fetchPrice().subscribe(data => {
  //     this.prices = data[0];
  //   });
  // }

}
