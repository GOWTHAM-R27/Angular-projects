import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Portfolio',
  templateUrl: './Portfolio.component.html',
  styleUrls: ['./Portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private logger:LoggerService) {

  }

  ngOnInit() {
    this.logger.log("Enter into portfolio page")

  }

}
