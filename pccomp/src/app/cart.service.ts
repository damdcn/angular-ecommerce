import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private authListenerSubs = new Subscription();
  public user: string;
  public isAuthenticated: boolean = false;
 
  constructor(private http: HttpClient, private authService: AuthentificationService) {
    this.user = this.authService.getUser();
  }

   getCartItems(): Observable<any> {
    return this.http.get<any>("http://192.168.0.34:8889/cart/"+this.user).pipe(
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
    return this.http.post("http://192.168.0.34:8889/cart", {user, product});
  }

  clearCart(): Observable<any> {
    let user = this.user;
    return this.http.post("http://192.168.0.34:8889/cart/clear", {user});
  }

  removeProductFromCart(product:any): Observable<any> {
    let user = this.user;
    return this.http.post("http://192.168.0.34:8889/cart/remove", {user, product});
    
  }
  
}