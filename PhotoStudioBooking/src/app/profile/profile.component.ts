import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  paymentForm!: FormGroup;
  paymentForm2!: FormGroup;
  loginEmail: any;
  booking: any = [];
  selectedPaymentMethod: 'card' | 'upi' | undefined;

  reSendRequest: number = 0;

  showPaymentPopup: boolean = false;

  //urls

  private userBookingUrl = environment.bookingUrl;

  constructor(
    public currentlogin: ServiceService,
    public router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private logger:LoggerService
  ) {


    const userData = localStorage.getItem('userdata');
    if (userData) {
      const values = JSON.parse(userData);
      currentlogin.load(values);

      this.loginEmail = this.currentlogin.getemail();
      console.log(this.loginEmail);
    }
  }
  ngOnInit() {

    this.logger.log("User details fetch successfully")
    this.logger.log("Booking details fetch successfully")



    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-4])\/\d{4}$/)]],
    });

    this.paymentForm2 = this.formBuilder.group({
      upiId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      upiPin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });


    this.fetchBookingDetails();
  }

  fetchBookingDetails() {
    this.http.get<any>(this.userBookingUrl).subscribe((data: any) => {
      this.booking = data.filter((booking: any) => booking.email === this.loginEmail);
    });
  }

  getBookingStatus(booking: any) {
    if (booking.status === 'confirmed') {
      return 'Confirmed';
    } else if (booking.status === 'canceled') {
      return 'Canceled';
    } else {
      return 'Pending';
    }
  }

  confirmBooking(bookingId: number) {
    const booking = this.booking.find((booking: any) => booking.id === bookingId);
    if (booking) {
      const updatedBooking = { ...booking, paymentStatus: 'Payment Done' };
      this.http
        .put(`http://localhost:3000/Booking/${bookingId}`, updatedBooking)
        .subscribe(
          (response) => {
            // alert('Booking confirmed!');
            booking.paymentStatus = 'Payment Done';
            this.fetchBookingDetails();
            // this.router.navigate(['/home']);
            this.showPaymentPopup = true;
          },
          (error) => {
            console.log('Failed to confirm booking:', error);
          }
        );
    }
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }


  cancelBooking(booking: any) {
    if (confirm("Confirm cancel the booking")) {
      if (booking) {
        const updatedBooking = { ...booking, status: 'canceled' };
        this.http
          .put(`http://localhost:3000/Booking/${booking.id}`, updatedBooking)
          .subscribe(
            (response) => {
              alert('Booking canceled!...your amount will return within 2 days');
              booking.status = 'canceled';
              this.fetchBookingDetails();
            },
            (error) => {
              console.log('Failed to cancel booking:', error);
            }
          );
      }
    }

  }


  changeBooking(booking: any) {
    console.log('Booking ID:', booking.id);

    if (confirm("You have " + (3 - booking.reSendRequestCount) + " request available")) {

      if (booking) {
        const updatedBooking = { ...booking, status: '', reSendRequestCount: ++booking.reSendRequestCount };
        this.http
          .patch(`http://localhost:3000/Booking/${booking.id}`, updatedBooking)
          .subscribe(
            (response) => {
              alert('Your request sent successfully...');
              booking.status = '';
              this.fetchBookingDetails();
            },
            (error) => {
              console.log('Failed to cancel booking:', error);
            }
          );
      }
    }

  }


  getPaymentStatus(booking: any) {
    if (booking.paymentStatus === 'Payment Done') {
      return 'Payment Done';
    } else {
      return 'Payment Pending';
    }
  }


  confirmPaymentMessage(booking: any) {
    if (booking.paymentStatus === "Payment Done" && booking.status === 'confirmed') {
      return "Your Booking Confirmed...Thank you";
    }
    else {
      return null;
    }
  }
  confirmBookingMessage(booking: any) {
    if (booking.paymentStatus == null && booking.status === 'confirmed') {
      return "Your Booking Confirmed...Please complete the payment";
    }
    else {
      return null;
    }
  }


  cancelBeforePayment(booking: any) {
    if (booking?.paymentStatus == null && booking.status === "canceled") {
      return "Unfortunately your booking was canceled...";
    }
    else {
      return null;
    }
  }


  cancelAfterPaymentDone(booking: any) {
    if (booking.paymentStatus === "Payment Done" && booking.status === "canceled") {
      return "Unfortunately your booking was canceled...your payment will return within 2 days";
    }
    else {
      return null;
    }

  }

  isPaymentOptionVisible(booking: any) {

    if (booking.status == 'confirmed' && booking?.paymentStatus == null) {
      return true;

    }
    else {
      return false;
    }
  }

  isPaymentButtonVisible(booking: any) {
    return booking.status === 'confirmed' && booking.paymentStatus === 'Payment Done';
  }
  isPaymentButton(booking: any) {
    return booking.status === 'confirmed' && booking.paymentStatus == null;
  }

  isChangeBookingVisible(booking: any) {
    return booking.status === 'canceled' && booking.paymentStatus == null && booking.reSendRequestCount < 3;
  }

  isPaymentDoneHidden(booking: any) {
    return booking.paymentStatus === 'Payment Done';
  }



  selectPaymentMethod(paymentMethod: 'card' | 'upi') {
    this.selectedPaymentMethod = paymentMethod;
  }


  public getemail() {
    return this.loginEmail;
  }


}
