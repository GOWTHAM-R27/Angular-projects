import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-PreWedding',
  templateUrl: './PreWedding.component.html',
  styleUrls: ['./PreWedding.component.css']
})
export class PreWeddingComponent implements OnInit {
  prices: any = {};
  categoryName: string = '';

  constructor( private service:ServiceService, private logger:LoggerService) { }

  ngOnInit() {
    // this.fetchPrice();
    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    });
    this.logger.log("Pre wedding packages fetch successfully")
  }

  bookNow() {
    var data={category:"Pre wedding",photo:this.prices[0]?.PreweddingPhoto, video:this.prices[0]?.PreweddingVideo}
    this.service.setCategoryName(data);
  }
}
