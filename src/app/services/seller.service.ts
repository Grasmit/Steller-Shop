import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LogIn, SignUp } from 'src/data-types';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject(false)
  isLogInError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }

  signUp(data:SignUp) {

    return this.http.post("http://localhost:3000/seller",data,{observe:"response"}).subscribe((result)=> {

    console.log(result)

    if(result)
    {
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }

  })
  }

  logIn(data:LogIn)
  {
    console.log("log in data",data)

    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result:any) => {
      
      if(result && result.body && result.body.length === 1)
      {
        this.isLogInError.emit(false)
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['seller-home'])
      }
      else
      {
        this.isLogInError.emit(true)
      }
    })

  }

  reloadSeller():void
  {
      if(localStorage.getItem('seller'))
      {
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['seller-home'])
      }
  }
}
