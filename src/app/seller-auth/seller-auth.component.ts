import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Route, Router } from '@angular/router';
import { LogIn, SignUp } from 'src/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  showLogInForm:boolean = false

  logInError:string = ''

  constructor(private service:SellerService,private router:Router){}

  ngOnInit()
  {
    this.service.reloadSeller()
  }

  openLogInForm()
  {
    this.showLogInForm = !this.showLogInForm
  }

  signUp(signUpData:SignUp):void {

    this.service.signUp(signUpData)
  }

  logIn(logInData:LogIn):void {

    this.service.logIn(logInData)

    this.service.isLogInError.subscribe((isError) => {

      if(isError)
      {
        this.logInError = '*Invalid email or password'
      }
    })
  }

}
