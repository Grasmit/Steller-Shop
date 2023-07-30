import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType:string = 'default'
  sellerName:string = ''

  constructor(private router:Router){}

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
        else
        {
          this.menuType = 'default'
        }
      }

    })
  }

  logout():void
  {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }
}
