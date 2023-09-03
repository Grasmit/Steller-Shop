import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product, cart, order } from 'src/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>()

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

  localAddToCart(data:Product)
  {
    let cartData = []

    let localCart = localStorage.getItem('localCart')

    if(!localCart)
    {
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else
    {
      cartData = JSON.parse(localCart)
      cartData.push(data)

      localStorage.setItem('localCart',JSON.stringify(cartData))
    }

    this.cartData.emit(cartData)
  }

  removeItemFormCart(productId:number)
  {
    let cartData = localStorage.getItem('localCart')

    if(cartData)
    {
      let items:Product [] = JSON.parse(cartData)

      items = items.filter((item:Product)=>productId !== item.id)

      localStorage.setItem('localCart',JSON.stringify(items))

      this.cartData.emit(items)

    }
  }

  addToCart(data:cart)
  {
    return this.http.post('http://localhost:3000/cart',data)
  }

  getCartList(userId:number)
  {
    this.http.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body)
      {
        this.cartData.emit(result.body)
      }
    })
  }

  removeToCart(cartId:number)
  {
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  currentCart()
  {
    let userStore = localStorage.getItem('user')

    let userData = userStore && JSON.parse(userStore)

    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }

  orderNow(data:order)
  {
    return this.http.post('http://localhost:3000/orders',data)
  }

  orderList()
  {
    let userStore = localStorage.getItem('user')

    let userData = userStore && JSON.parse(userStore)

    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id)
  }

  deleteCartItems(cartId:number)
  {
    let userStore = localStorage.getItem('user')

    let userData = userStore && JSON.parse(userStore)

    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((res)=>{

      if(res)
      {
        this.cartData.emit([])
      }
    })
  }

  deleteOrder(orderId:string)
  {
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}
