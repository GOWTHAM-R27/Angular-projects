import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.css']
})
export class WeddingComponent implements OnInit {

  prices: any = {};

  constructor(private service:ServiceService, private logger:LoggerService) { }

  ngOnInit() {
    // this.fetchPrice();
    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    });

    this.logger.log("Wedding packages fetch successfully")
  }

  bookNow() {
    var data={category:"Wedding",photo:this.prices[1]?.WeddingPhoto, video:this.prices[1]?.WeddingVideo}
    this.service.setCategoryName(data); // Set category name here
  }

}
