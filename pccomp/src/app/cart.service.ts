import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public user: string = "";
  public isAuthenticated: boolean = false;
 
  constructor(private http: HttpClient, private authService: AuthentificationService) { 
    this.authService.cast.subscribe(user => this.user = user);
    this.authService.cast2.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

   getCartItems(): Observable<any> {
    return this.http.get<any>("http://localhost:8889/cart/"+this.user).pipe(
      map((result) => {
        let cartItems: any[] = [];

        for (let item of result[0].panier) {
          let productExists = false

          for (let i in cartItems) {
            if (cartItems[i].nom === item.nom) {
              cartItems[i].qty++
              productExists = true
              break;
            }
          }

          if (!productExists) {
            cartItems.push(item);
          }
        }

        return cartItems;
      })
    );
  }


  addProductToCart(product: any): Observable<any> {
    let user = this.user;
    return this.http.post("http://localhost:8889/cart", {user, product});
  }

  clearCart(): Observable<any> {
    let user = this.user;
    return this.http.post("http://localhost:8889/cart/clear", {user});
  }

  removeProductFromCart(product:any): Observable<any> {
    let user = this.user;
    return this.http.post("http://localhost:8889/cart/remove", {user, product});
    
  }
  
}