import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from '../confirm.validator';
import { LoggerService } from '../logger.service';


@Component({
  selector: 'app-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css'],
  styles: ['input.ng-invalid{border-bottom: 2px solid red;} input.ng-valid{border-bottom: 2px solid green;}']
})
export class ForgotPasswordComponent implements OnInit {

  email: any = "";
  emailNotFound: boolean = false;
  emailExists: boolean = false;
  newPassword: any = "";
  userId: number | undefined;

  newPass: any = "";
  confirmpass: any = "";
  retUrl: any = 'login';


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logger:LoggerService) { }

  showPassword = false;

  toggleShow() {
    this.showPassword = !this.showPassword;
  }



  resetpass = this.formBuilder.group({
    newPass: ['', [Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)]],
    confirmpass: ['', [Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)]]
  });

  ngOnInit() {

    this.logger.log("Forgot password")
  }


  // Popup

  isPopupOpen = true;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.router.navigate(['/login']);

  }

  // ForgotPassword

  checkEmail() {
    this.emailNotFound = false;
    this.emailExists = false;

    this.http.get<any>('http://localhost:3000/users', { params: { email: this.email } }).subscribe((response) => {
      if (response.length > 0) {
        this.emailExists = true;
        this.userId = response[0].id;
        alert("Email ID granted");
      } else {
        this.emailNotFound = true;
      }
    })
  }

  resetPassword() {
    const updatedUser = {
      password: this.newPassword,
      confirmpass: this.confirmpass
    };

    this.http.patch(`http://localhost:3000/users/${this.userId}`, updatedUser).subscribe(() => {
      alert('Password updated successfully');
      this.router.navigate(['/login']);
    })
  }

  passwordsDoNotMatch(): boolean {
    return this.newPassword !== this.confirmpass;
  }
}
