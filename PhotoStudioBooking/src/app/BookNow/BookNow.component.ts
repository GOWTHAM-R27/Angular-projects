import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-BookNow',
  templateUrl: './BookNow.component.html',
  styleUrls: ['./BookNow.component.css']
})
export class BookNowComponent implements OnInit {
  userinfo: any = "";


  firstName: any = "";
  mobileno1: any = "";
  email: any = "";
  date: any = "";
  pAddress: any = "";
  eAddress: any = "";
  service: any = "";
  noOfDays: any = "";
  totalprice: any = "";


  prices: any = {};
  booking: any = [];
  loginEmail: any;

  PreweddingTotalPrice: any;
  WeddingTotalPrice: any;
  PortraitTotalPrice: any;
  EventsTotalPrice: any;
  ProductsTotalPrice: any;
  TravelTotalPrice: any;


  InitialPriceValue: any;
  ActualPrice = 0;
  DiscountPrice = 0;
  PremiumDiscountPrice = 0;

  DiscountTemp: any;

  PremiumDiscountPriceTemp: any;

  public bookForm1!: FormGroup;

  private usersBookingUrl = environment.bookingUrl;

  constructor(
    public services: ServiceService,
    private formbuilder: FormBuilder,
    public currentlogin: ServiceService,
    private http: HttpClient,
    private router: Router,
    private logger:LoggerService
  ) {

    const userData = localStorage.getItem('userdata');
    if (userData) {
      const values = JSON.parse(userData);
      currentlogin.load(values);

      this.loginEmail = this.currentlogin.getemail();
      this.logger.log(this.loginEmail);
    }

    this.services.getDiscountPrice().subscribe((res) => {
      var discount = JSON.parse(JSON.stringify(res));
      this.DiscountTemp = discount.price;
    });

    this.services.getDiscountPricePremium().subscribe((res) => {
      var premiumdiscount = JSON.parse(JSON.stringify(res));
      this.PremiumDiscountPriceTemp = premiumdiscount.price;
    });
  }

  ngOnInit() {

    this.logger.log("Book now page")
    this.logger.log("Services packages fetch successfully")
    this.logger.log("Discounts packages fetch successfully")


    this.services.userinfo().subscribe(data => {
      this.userinfo = data;
    });

    this.bookForm1 = this.formbuilder.group({
      firstName: ["", [Validators.required]],
      mobileno1: ["", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ["", [Validators.required, Validators.email]],
      date: ["", [Validators.required]],
      pAddress: ["", [Validators.required]],
      eAddress: ["", [Validators.required]],
      service: ["", [Validators.required]],
      noOfDays: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      totalprice: ["", [Validators.required]],
    });

    this.services.priceDetails().subscribe(data => {
      this.prices = data;

      this.PreweddingTotalPrice = parseFloat(this.prices[0]?.PreweddingPhoto) + parseFloat(this.prices[0]?.PreweddingVideo);
      this.WeddingTotalPrice = parseFloat(this.prices[1]?.WeddingPhoto) + parseFloat(this.prices[1]?.WeddingVideo);
      this.PortraitTotalPrice = parseFloat(this.prices[2]?.PortraitPhoto) + parseFloat(this.prices[2]?.PortraitVideo);
      this.EventsTotalPrice = parseFloat(this.prices[3]?.EventsPhoto) + parseFloat(this.prices[3]?.EventsVideo);
      this.ProductsTotalPrice = parseFloat(this.prices[4]?.ProductsPhoto) + parseFloat(this.prices[4]?.ProductsVideo);
      this.TravelTotalPrice = parseFloat(this.prices[5]?.TravelPhoto) + parseFloat(this.prices[5]?.TravelVideo);
    });


    let currentUserEmail = this.currentlogin.getemail();
    if (currentUserEmail) {
      this.bookForm1.get('email')?.setValue(currentUserEmail);
    }

    const Category = this.services.getCategoryName();
    if (Category) {

      this.bookForm1.get('service')?.setValue(Category.category);
      console.log(Category);
      this.InitialPriceValue = parseFloat(Category.photo) + parseFloat(Category.video);
      this.ActualPrice = this.InitialPriceValue;
      this.bookForm1.get('totalprice')?.setValue(this.InitialPriceValue);
    }




    this.bookForm1.controls['noOfDays'].valueChanges.subscribe(() => {
      console.log(this.bookForm1.controls['noOfDays'].value)

      var data = this.bookForm1.controls['noOfDays'].value;
      if (data == null || data == '') {
        this.DiscountPrice = 0;
        this.ActualPrice = this.InitialPriceValue;
        this.bookForm1.get('totalprice')?.setValue(this.InitialPriceValue);
      }
      else if (data >= 2 && data < 5) {

        this.services.getDiscountPrice().subscribe((res) => {

          console.log(res);
          var discount = JSON.parse(JSON.stringify(res));
          this.DiscountPrice = discount.price;
          this.ActualPrice = this.InitialPriceValue * data;
          this.bookForm1.get('totalprice')?.setValue(this.InitialPriceValue * data - this.DiscountPrice);

        });


      }
      else if (data >= 5 && data <= 10) {

        this.services.getDiscountPricePremium().subscribe((res) => {

          console.log(res);
          var discount = JSON.parse(JSON.stringify(res));
          this.PremiumDiscountPrice = discount.price;
          this.DiscountPrice = this.PremiumDiscountPrice;
          this.ActualPrice = this.InitialPriceValue * data;
          this.bookForm1.get('totalprice')?.setValue(this.InitialPriceValue * data - this.PremiumDiscountPrice);

        });


      }
      else {
        this.DiscountPrice = 0;
        this.ActualPrice = this.InitialPriceValue * data;
        this.bookForm1.get('totalprice')?.setValue(this.InitialPriceValue * data);
      }

    })

  }



  bookForm() {

    var data = this.bookForm1.value;
    Object.assign(data, { reSendRequestCount: 0 });

    this.http.post<any>(this.usersBookingUrl, data)
      .subscribe(data => {
        alert("Booked Successfully!");
        this.bookForm1.reset();
        this.router.navigate(['/home']);
      }, err => {
        alert("Booking Failed");
      });
  }


  public getemail() {
    return this.loginEmail;
  }
}
