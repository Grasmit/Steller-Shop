import { Component } from '@angular/core';
import { Product } from 'src/data-types';
import { ProductService } from '../services/product.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage:string|undefined

  constructor(private service:ProductService){}

  addProduct(productData:Product)
  {
      console.warn(productData)

      this.service.addProduct(productData).subscribe((res)=>{

        if(res)
        {
          this.addProductMessage = 'Product added successfully'
        }

        setTimeout(()=>{
          this.addProductMessage = undefined
        },3000)
      })
      
  }

}
