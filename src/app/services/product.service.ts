import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(productData:Product)
  {
    console.log('add product service',productData)  

    return this.http.post('http://localhost:3000/product',productData)
  }

  productList()
  {
    return this.http.get<Product[]>('http://localhost:3000/product')
  }

  deleteProduct(id:number)
  {
    return this.http.delete(`http://localhost:3000/product/${id}`)
  }

  getProduct(id:string)
  {
    return this.http.get<Product>(`http://localhost:3000/product/${id}`)
  }

  updateProduct(productData:Product)
  {
    return this.http.put(`http://localhost:3000/product/${productData.id}`,productData)
    
  }

  popularProduct()
  {
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=3')
  }

  trendyProduct()
  {
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=8')
  }

  searchProduct(query:string)
  {
    return this.http.get<Product[]>(`http://localhost:3000/product?q=${query}`)
  }
}
