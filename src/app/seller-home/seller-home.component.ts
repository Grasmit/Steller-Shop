import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data-types';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList: undefined | Product[]

  productMessage: undefined | string

  constructor(private product:ProductService) {}

  ngOnInit():void
  {
    this.list()
  }

  deleteProduct(id:number)
  {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list()
  {
    this.product.productList().subscribe((res)=>{

      this.productList = res
    })
  }

}
