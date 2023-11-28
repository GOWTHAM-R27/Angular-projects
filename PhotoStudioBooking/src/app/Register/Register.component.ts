import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirm.validator';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  styles:[`input.ng-invalid{border-bottom :2px solid red;}

  input.ng-valid{border-bottom:2px solid green;}`
  ]
})
export class RegisterComponent implements OnInit {


  //register form fields formcontrolname
  username: any = "";
  mobileno:any="";
  email: any = "";
  password: any = "";
  confirmpass: any = "";

  //formgroup name

  public signUpForm1 !: FormGroup;

  //register url
  private userRegisterUrl = environment.registerUrl;


  constructor( private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private logger:LoggerService) { }



  ngOnInit() {


    this.logger.log("Enter into register page")

    //validate the fields

    this.signUpForm1 = this.formbuilder.group
      ({
        username: ["", [Validators.required,Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9]{7,15}$/)]],
        mobileno:["",[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        email: ["", [Validators.required,Validators.pattern("^([a-z0-9\.]+)*@?(gmail)\.?(-?[com]{3})+$")]],
        password: ["", [Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)]],
        confirmpass: ["", [Validators.required]]
      }, { validator: ConfirmedValidator('password', 'confirmpass') })
  }

  submitForm(){
    this.http.get<any>(this.userRegisterUrl).subscribe(res=>{
      const user=res.find((result:any)=>{
        return result.email === this.signUpForm1.value.email; //checking email already exist
      });
      if(user){
        alert("Email already exists");
      }
      else{
        var values = this.signUpForm1.value;
        Object.assign(values,{"role":"user"}); //set one extra field for identify user and admin login
        this.http.post<any>(this.userRegisterUrl, values).subscribe((data) => {
          alert("Successfully Registered");
          this.router.navigateByUrl('/login');
        });
      }
    });
}
}
