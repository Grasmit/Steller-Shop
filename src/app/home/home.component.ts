import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Route, Router } from '@angular/router';
import { Product, SignUp } from 'src/data-types';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProducts!:Product[] | undefined
  trendyProducts!:Product[] | undefined


  constructor(private service:SellerService,private productService:ProductService,private router:Router){}

  ngOnInit()
  {

    this.productService.popularProduct().subscribe((res)=>{
      console.log(res)
      this.popularProducts = res
    })

    this.productService.trendyProduct().subscribe((res)=>{
      console.log(res)
      this.trendyProducts = res
    })

  }

 }
