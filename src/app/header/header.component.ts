import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType:string = 'default'

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
        }
        else
        {
          this.menuType = 'default'
        }
      }

    })
  }
}
