export interface SignUp {

    name:string,
    email:string,
    password:string
}

export interface LogIn {
    
    email:string,
    password:string
}

export interface Product {

    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:number | undefined

}

export interface cart {

    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:undefined | number,
    quantity:undefined|number,
    userId:number,
    productId:number
}