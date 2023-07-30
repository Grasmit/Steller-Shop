import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData: undefined | Product

  updateMessage: undefined | string

  constructor(private route:ActivatedRoute,private product:ProductService){}

  ngOnInit():void
  {
    let productId = this.route.snapshot.paramMap.get('id')

    productId && this.product.getProduct(productId).subscribe((data)=>{

      this.productData = data
    })
  }

  updateProduct(data:Product)
  {
    if(this.productData)
    {
      data.id = this.productData.id
    }

      this.product.updateProduct(data).subscribe((res)=>{
        if(res)
        {
          this.updateMessage = "Product added successfully"
        }

        setTimeout(()=>{
          this.updateMessage = undefined
        },3000)

      })
  }

}
