import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Events',
  templateUrl: './Events.component.html',
  styleUrls: ['./Events.component.css']
})
export class EventsComponent implements OnInit {

  prices: any = {};

  constructor(private service:ServiceService, private logger:LoggerService) { }

  ngOnInit() {
    // this.fetchPrice();
    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    })

    this.logger.log("Events packages fetch successfully")
  }
  bookNow() {
    var data={category:"Events",photo:this.prices[3]?.EventsPhoto, video:this.prices[3]?.EventsVideo}
    this.service.setCategoryName(data);

  }

}
