import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products! : Array<Product>;
  constructor() {
    this.products=[
      {id: UUID.UUID(), name: 'iPhone', price: 1000, promotion: true},
      {id: UUID.UUID(), name: 'HP', price: 10000, promotion: false},
      {id: UUID.UUID(), name: 'Airpods', price: 600, promotion: true},
    ];
    for(let i=0;i<10;i++)
    {
      this.products.push({id: UUID.UUID(), name: 'iPhone', price: 1000, promotion: true});
      this.products.push({id: UUID.UUID(), name: 'HP', price: 10000, promotion: false});
      this.products.push({id: UUID.UUID(), name: 'Airpods', price: 600, promotion: true});
    }
  }
  public getAllProducts():Observable<Array<Product>>{
    return of(this.products);
  }
  public getPageProducts(page:number,size:number):Observable<PageProduct>{
    let index=page*size;
    let totalPages=~~(this.products.length/size);//division entiere

    if(this.products.length%size!==0){
      totalPages++;
    }
    let pageProducts=this.products.slice(index,index+size);
    return of({products:pageProducts,page:page,size:size,totalPages:totalPages});

  }
  public deleteProduct(id:string):Observable<Array<Product>>{
    this.products = this.products.filter(product => product.id !== id);
    return of(this.products);
  }
  public setPromotion(id:string):Observable<Array<Product>>{
    let product = this.products.find(product => product.id === id);
    if(product){
      product.promotion = !product.promotion;
      return of(this.products);
    }
    return throwError(()=>new Error("Product not found"));
  }
  public searchProducts(keyword:string,page:number,size:number):Observable<PageProduct>{
    let result = this.products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
    let index=page*size;
    let totalPages=~~(result.length/size);//division entiere

    if(this.products.length%size!==0){
      totalPages++;
    }
    let pageProducts=result.slice(index,index+size);
    return of({products:pageProducts,page:page,size:size,totalPages:totalPages});
  }
  public addProduct(product:Product):Observable<Array<Product>>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(this.products);
  }
  public findProduct(id:string):Observable<Product>{
    let product = this.products.find(product => product.id === id);
    if(product){
      return of(product);
    }
    return throwError(()=>new Error("Product not found"));
  }
  public updateProduct(product:Product):Observable<Product>{
     this.products=this.products.map(p=>(p.id===product.id)?product:p);
     return of(product);
  }
}

