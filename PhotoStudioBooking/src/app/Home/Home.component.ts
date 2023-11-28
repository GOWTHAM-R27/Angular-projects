import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  styles: [`input.ng-invalid{border-bottom :2px solid red;}

  input.ng-valid{border-bottom:2px solid green;}`
  ]
})
export class HomeComponent implements OnInit {


  contactEmail: any;
  contactMobileNo: any;
  contactAddress: any;
  aboutUs: any;

  name: any = "";
  email: any = "";
  feedback: any = "";

  public feedBackForm!: FormGroup;

  mainImageSrc: string = "/assets/img/portimage1.jpg";


  private userFeedbackUrl = environment.feedbackUrl;

  constructor(private service: ServiceService, private formbuilder: FormBuilder,
    private http: HttpClient, private router: Router, private logger:LoggerService) {
  }


  ngOnInit() {

    //feedback

    this.feedBackForm = this.formbuilder.group
      ({
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.pattern("^([a-z0-9\.]+)*@?(gmail)\.?(-?[com]{3})+$")]],
        feedback: ["", [Validators.required]]
      }),

      //about
      this.service.getAboutUs().subscribe((res) => {
        var about = JSON.parse(JSON.stringify(res));

        this.aboutUs = about.about;
      });

    //email
    this.service.getContactsEmail().subscribe((res) => {
      var email = JSON.parse(JSON.stringify(res));

      this.contactEmail = email.email;
    });

    //mobile no
    this.service.getContactsMobile().subscribe((res) => {
      var mobileNo = JSON.parse(JSON.stringify(res));

      this.contactMobileNo = mobileNo.mobileno;
    });

    //address
    this.service.getContactsAddress().subscribe((res) => {
      var Address = JSON.parse(JSON.stringify(res));
      this.contactAddress = Address.address;
    });

    //logger
    this.logger.log("Home component");
    this.logger.log("Contacts and about us fetch successfully from db.json");

  }
  changeImage(imageSrc: string) {
    this.mainImageSrc = imageSrc; // Update main image source
  }
  submitForm() {
    var values = this.feedBackForm.value;
    this.http.post<any>(this.userFeedbackUrl, values).subscribe((data) => {
      alert("Thank you for your feedback");
      this.feedBackForm.reset();
      this.router.navigateByUrl('/home');
    });

  }
}
