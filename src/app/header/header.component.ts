import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType:string = 'default'
  sellerName:string = ''

  searchResult!: Product[] | undefined

  userName:string = ""
  cartItems = 0

  constructor(private router:Router,private productService:ProductService){}

  ngOnInit()
  {
    this.router.events.subscribe((val:any)=>{

      if(val.url)
      {

        console.log(val)

        if(localStorage.getItem('seller') && val.url.includes('seller'))
        {
          this.menuType = 'seller'

          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
        }
        else if(localStorage.getItem('user'))
        {
          let userStore = localStorage.getItem('user')

          let userData = userStore && JSON.parse(userStore)

          this.userName = userData.userName

          this.menuType = 'user'

          this.productService.getCartList(userData.id)
        }
        else
        {
          this.menuType = 'default'
        }
      }
    })

    let cartData = localStorage.getItem('localCart')

    if(cartData)
    {
      this.cartItems = JSON.parse(cartData).length
    }

    this.productService.cartData.subscribe((result)=>{
      this.cartItems = result.length
    })
  }

  logout():void
  {
    localStorage.removeItem('seller')
    this.menuType = 'default'
    this.router.navigate(['/'])
  }

  userLogout():void
  {
    localStorage.removeItem('user')
    this.menuType = 'default'
    this.router.navigate(['/user-auth'])
    this.productService.cartData.emit([])
  }

  searchProduct(query:KeyboardEvent)
  {
    if(query)
    {
      const element = query.target as HTMLInputElement
      console.log(element.value)

      this.productService.searchProduct(element.value).subscribe((res)=>{

        if(res.length > 5)
        {
          res.length = 5
        }
        console.log(res)
        this.searchResult = res
      })
    }
  }

  hideSearch()
  {
    this.searchResult = undefined
  }

  submitSearch(val:string)
  {
    this.router.navigate([`search/${val}`])
  }

  redirectToDetails(id:number)
  {
    this.router.navigate([`details/${id}`])

  }
}
