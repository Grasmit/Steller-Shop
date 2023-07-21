import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Route, Router } from '@angular/router';
import { SignUp } from 'src/data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(private service:SellerService,private router:Router){}

 }
