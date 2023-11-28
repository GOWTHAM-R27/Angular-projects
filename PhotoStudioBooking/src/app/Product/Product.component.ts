import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export class ProductComponent implements OnInit {

  prices: any = {};

  constructor( private service:ServiceService, private logger:LoggerService) { }

  ngOnInit() {
    // this.fetchPrice();
    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    });
    this.logger.log("Products packages fetch successfully")
  }
  bookNow() {

    var data={category:"Products",photo:this.prices[4]?.ProductsPhoto, video:this.prices[4]?.ProductsVideo}
    this.service.setCategoryName(data); // Set category name here
  }

}
