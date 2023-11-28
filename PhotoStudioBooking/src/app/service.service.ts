import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private client: HttpClient, private http:HttpClient) { }

  private login:any;
  private selectedCategory: any ;

  //http url

  private userRegisterUrl = environment.registerUrl;
  private usersBookingUrl = environment.bookingUrl;
  private pricePackagesUrl = environment.priceUrl;
  private basicDiscountPriceUrl = environment.basicDiscountUrl;
  private premiumDiscountPriceUrl = environment.premiumDiscountUrl;
  private studioAboutUsUrl = environment.aboutUsUrl;
  private emailContactUrl = environment.contactEmailUrl;
  private mobileNoContactUrl = environment.contactMobileUrl;
  private addressContactUrl = environment.contactAddressUrl;
  private userFeedbackUrl = environment.feedbackUrl;

  public islogin(){

    if(this.login==null){
      return false;
    }
    return true;
  }

  public load(data:any){
    this.login = data;
  }

  public isadmin(){
    if(this.login!=null){
      if(this.login.role=="admin"){
        return true;
      }
      return false;
    }
    return false;
  }

  //bookinginfo

  public getemail() {
    if (this.login != null) {
      return this.login.email;
    }
    return '';
  }

  public getname() {
    if (this.login == null) {
      return false;
    }
    return this.login;
  }

  userinfo() {
    return this.client.get(this.userRegisterUrl);
  }


  deleteProduct(id:any){
    return this.client.delete(this.usersBookingUrl+id);
  }


 priceDetails(){
  return this.client.get(this.pricePackagesUrl);
 }

 setCategoryName(category: any) {
  this.selectedCategory = category;
}

getCategoryName() {
  return this.selectedCategory;
}


getDiscountPrice(){

  return this.client.get(this.basicDiscountPriceUrl);
}

getDiscountPricePremium(){
  return this.client.get(this.premiumDiscountPriceUrl);
}

//abouts

getAboutUs(){
  return this.client.get(this.studioAboutUsUrl);
}

getContactsEmail(){
  return this.client.get(this.emailContactUrl);
}
getContactsMobile(){
  return this.client.get(this.mobileNoContactUrl);
}
getContactsAddress(){
  return this.client.get(this.addressContactUrl);
}

getFeedback(){
  return this.client.get(this.userFeedbackUrl);
}

}
