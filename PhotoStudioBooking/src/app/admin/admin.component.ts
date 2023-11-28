import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../logger.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  userinfo:any="";
  bookinginfo:any="";
  booking: any = [];
  prices: any = {};
  feedback:any=[];

  showPreweddingForm = false;
  showWeddingForm = false;
  showPortraitForm = false;
  showEventsForm = false;
  showProductsForm = false;
  showTravelForm = false;
  updatevalues: FormGroup;

  DiscountPrice:any;

  updateBasicDiscountForm: FormGroup;

  PremiumDiscountPrice:any;

  updatePremiumDiscountForm:FormGroup;


  showBasicDiscount = false;
  showPremiumDiscount = false;


  constructor(private formBuilder: FormBuilder,private service:ServiceService, private http: HttpClient,
    private router:Router, private fetchPrices: ServiceService, private logger:LoggerService){
    this.updatevalues = this.formBuilder.group({
      preweddingPhoto: ['', Validators.required],
      preweddingVideo: ['', Validators.required],
      weddingPhoto: ['', Validators.required],
      weddingVideo: ['', Validators.required],
      portraitPhoto: ['', Validators.required],
      portraitVideo: ['', Validators.required],
      eventsPhoto: ['', Validators.required],
      eventsVideo: ['', Validators.required],
      productsPhoto: ['', Validators.required],
      productsVideo: ['', Validators.required],
      travelPhoto: ['', Validators.required],
      travelVideo: ['', Validators.required]
    });

    this.updateBasicDiscountForm = this.formBuilder.group({
      basicDiscount: ['', Validators.required]
    });
    this.updatePremiumDiscountForm = this.formBuilder.group({
      premiumDiscount: ['', Validators.required]
    });

  }

  ngOnInit(){

    this.logger.log("Admin page")
    this.logger.log("User details fetch successfully")
    this.logger.log("User booking details fetch successfully")
    this.logger.log("Services packages fetch successfully")
    this.logger.log("Discount packages fetch successfully")
    this.logger.log("User feedback details fetch successfully")

    this.fetchPriceDetails();

    this.service.userinfo().subscribe(data=>{

      this.userinfo=data;
    });

    this.http.get<any>("http://localhost:3000/Booking").subscribe(data=>{

      this.bookinginfo=data;
    });

    this.service.priceDetails().subscribe(data=>{
      this.prices=data;
    });

    this.service.getFeedback().subscribe(data=>{

      this.feedback=data;

    })


    this.service.getDiscountPrice().subscribe((res)=>{
      var discount=JSON.parse(JSON.stringify(res));

      this.DiscountPrice=discount.price;
    });

    this.service.getDiscountPricePremium().subscribe((res)=>{
      var discount1=JSON.parse(JSON.stringify(res));

      this.PremiumDiscountPrice=discount1.price;
    });

  }
  fetchBookingDetails() {
    this.http.get<any>("http://localhost:3000/Booking").subscribe(
      (data) => {
        this.bookinginfo = data;
      },
      (error) => {
        console.log('Failed to fetch booking details:', error);
      }
    );
  }

  confirmBooking(bookingId: number) {
    const booking = this.bookinginfo.find((booking: any) => booking.id === bookingId);
    if (booking) {
      const updatedBooking = { ...booking, status: 'confirmed' };
      this.http
        .put(`http://localhost:3000/Booking/${bookingId}`, updatedBooking)
        .subscribe(
          (response) => {
            alert('Booking confirmed!');
            booking.status = 'confirmed';
            this.fetchBookingDetails();
          },
          (error) => {
            console.log('Failed to confirm booking:', error);
          }
        );
    }
  }

  cancelBooking(bookingId: number) {
    const booking = this.bookinginfo.find((booking: any) => booking.id === bookingId);
    if (booking) {
      const updatedBooking = { ...booking, status: 'canceled' };
      this.http
        .put(`http://localhost:3000/Booking/${bookingId}`, updatedBooking)
        .subscribe(
          (response) => {
            alert('Booking canceled!');
            booking.status = 'canceled';
            this.fetchBookingDetails();
          },
          (error) => {
            console.log('Failed to cancel booking:', error);
          }
        );
    }
  }

getPaymentStatus(){
  if (this.booking.paymentStatus === 'confirmed') {
    return 'Confirmed';
  } else if (this.booking.paymentStatus === 'canceled') {
    return 'Canceled';
  } else {
    return 'Pending';
  }

}

fetchPriceDetails() {
  this.http.get<any>('http://localhost:3000/Prices').subscribe((data) => {
    this.prices = data;
  });
}

  deleteproduct(id: any) {
    if (confirm("Confirm Delete Booking")) {
      this.service.deleteProduct(id).subscribe(data => {
        alert("Deleted Successfully!!");
        window.location.reload();
      });
    }
  }



  openPreweddingPopupForm() {
    this.showPreweddingForm = true;
  }

  closePopup() {
    this.showPreweddingForm = false;
  }

  updatePreweddingPrice() {
    const updatePriceValue = {
      PreweddingPhoto: this.updatevalues.get('preweddingPhoto')?.value,
      PreweddingVideo: this.updatevalues.get('preweddingVideo')?.value
    };

    const priceId = this.prices[0]?.id;

    this.http.patch(`http://localhost:3000/Prices/${priceId}`, updatePriceValue).subscribe(() => {
      alert('Pre Wedding price updated successfully');
      this.fetchPriceDetails();
      this.showPreweddingForm = false;
    });
  }

  openWeddingPopupForm() {
    this.showWeddingForm = true;
  }

  closeWeddingPopupForm() {
    this.showWeddingForm = false;
  }

  updateWeddingPrice() {
    const updatePriceValue = {
      WeddingPhoto: this.updatevalues.get('weddingPhoto')?.value,
      WeddingVideo: this.updatevalues.get('weddingVideo')?.value
    };

    const priceId = this.prices[1]?.id;

    this.http.patch(`http://localhost:3000/Prices/${priceId}`, updatePriceValue).subscribe(() => {
      alert('Wedding price updated successfully');
      this.fetchPriceDetails(); // Fetch updated price details
      this.showWeddingForm = false; // Close the form
    });
  }

  openPortraitPopupForm() {
    this.showPortraitForm = true;
  }

  closePortraitPopupForm() {
    this.showPortraitForm = false;
  }

  updatePortraitPrice() {
    const updatePriceValue = {
      PortraitPhoto: this.updatevalues.get('portraitPhoto')?.value,
      PortraitVideo: this.updatevalues.get('portraitVideo')?.value
    };

    const priceId = this.prices[2]?.id;

    this.http.patch(`http://localhost:3000/Prices/${priceId}`, updatePriceValue).subscribe(() => {
      alert('Portrait price updated successfully');
      this.fetchPriceDetails(); // Fetch updated price details
      this.showWeddingForm = false; // Close the form
    });
  }

  openEventsPopupForm() {
    this.showEventsForm = true;
  }

  closeEventsPopupForm() {
    this.showEventsForm = false;
  }

  updateEventsPrice() {
    const updatePriceValue = {
      EventsPhoto: this.updatevalues.get('eventsPhoto')?.value,
      EventsVideo: this.updatevalues.get('eventsVideo')?.value
    };

    const priceId = this.prices[3]?.id;

    this.http.patch(`http://localhost:3000/Prices/${priceId}`, updatePriceValue).subscribe(() => {
      alert('Events price updated successfully');
      this.fetchPriceDetails();
      this.showWeddingForm = false;
    });
  }

  openProductsPopupForm() {
    this.showProductsForm = true;
  }

  closeProductsPopupForm() {
    this.showProductsForm = false;
  }

  updateProductsPrice() {
    const updatePriceValue = {
      ProductsPhoto: this.updatevalues.get('productsPhoto')?.value,
      ProductsVideo: this.updatevalues.get('productsVideo')?.value
    };

    const priceId = this.prices[4]?.id;

    this.http.patch(`http://localhost:3000/Prices/${priceId}`, updatePriceValue).subscribe(() => {
      alert('Products price updated successfully');
      this.fetchPriceDetails();
      this.showWeddingForm = false;
    });
  }

  openTravelPopupForm() {
    this.showTravelForm = true;
  }

  closeTravelPopupForm() {
    this.showTravelForm = false;
  }

  updateTravelPrice() {
    const updatePriceValue = {
      TravelPhoto: this.updatevalues.get('travelPhoto')?.value,
      TravelVideo: this.updatevalues.get('travelVideo')?.value
    };

    const priceId = this.prices[1]?.id;

    this.http.patch(`http://localhost:3000/Prices/${priceId}`, updatePriceValue).subscribe(() => {
      alert('Travel price updated successfully');
      this.fetchPriceDetails();
      this.showWeddingForm = false;
    });
  }


  //discount

  updateBasicDiscount() {

    const basicDiscountControl = {

      price:this.updateBasicDiscountForm.get('basicDiscount')?.value


    };
    this.http.patch(`http://localhost:3000/DiscountPrice/1`, basicDiscountControl).subscribe(() => {
      alert('Discount price updated successfully');
      this.showBasicDiscount= false;
    });

  }

  openBasicDiscountForm() {
    this.DiscountPrice = this.DiscountPrice;
    this.showBasicDiscount = true;
  }

  closeBasicDiscountPopup() {
    this.showBasicDiscount= false;
  }

//premium discount

  updatePremiumDiscount() {

    const premiumDiscountControl = {
      price:this.updatePremiumDiscountForm.get('premiumDiscount')?.value

    };
    this.http.patch(`http://localhost:3000/DiscountPricePremium/1`, premiumDiscountControl).subscribe(() => {
      alert('Discount price updated successfully');
      this.showPremiumDiscount= false;
    });

  }




  openPremiumDiscountForm() {
    this.DiscountPrice = this.DiscountPrice;
    this.showPremiumDiscount = true;
  }

  closePremiumDiscountPopup() {
    this.showPremiumDiscount= false;
  }

}
