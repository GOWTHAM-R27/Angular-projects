import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm2!: FormGroup;
  email: any = "";
  password: any = "";
  retUrl: any = "login";

  //register url
  private userRegisterUrl = environment.registerUrl;


  constructor( private route: ActivatedRoute, private router: Router,
    private formbuilder: FormBuilder, private http: HttpClient,
    private currentlogin:ServiceService, private logger:LoggerService) { }


  ngOnInit() {

    this.loginForm2 = this.formbuilder.group
    ({
      email:["", [Validators.required,Validators.pattern("^([a-z0-9\.]+)*@?(gmail)\.?(-?[com]{3})+$")]],
      password: ["", [Validators.required]]
    })

    this.route.queryParamMap.subscribe(parama => {
      this.retUrl = parama.get('retUrl');
      console.log("LoginComponent/ngOnInit", this.retUrl);
    })

    this.logger.log("Enter into login page")
    this.logger.log("User details fetch successfully")

  }


  login3() {
    this.http.get<any>(this.userRegisterUrl)
      .subscribe(data => {
        const user = data.find((a: any) => {
          return a.email === this.loginForm2.value.email && a.password === this.loginForm2.value.password
        });
        if (user) {
          alert("Login successful!!");
          localStorage.setItem('userdata', JSON.stringify(user)); // convert "user" data into string & store in localstorage as userdata
          this.currentlogin.load(user); // load the user

          // this.loginForm2.reset();
          this.router.navigate(['/home']);
        } else {
          alert("User not found")
        }
      }, err => {
        alert("Login failed!!");
      });
  }
}
