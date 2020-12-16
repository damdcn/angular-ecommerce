import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private http: HttpClient) { }

getProducts(): Observable<any> {
    return this.http.get<any>("http://localhost:8889/produits");
  }
   getCategory():Observable<any> {
  return this.http.get("http://localhost:8889/categories");
  }

  getProductsBySearch(filtervalue:any):Observable<any>{
    return this.http.get<any>("http://localhost:8889/produits/search/"+ filtervalue)
  }

  getProductsById(filtervalue:any):Observable<any>{
    return this.http.get<any>("http://localhost:8889/produits/searchid/"+ filtervalue)
  }

}