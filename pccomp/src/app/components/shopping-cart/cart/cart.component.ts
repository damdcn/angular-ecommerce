import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/messenger.service'
import { CartService } from 'src/app/cart.service';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  
  cartItems:any[]= [];
  cartTotal = 0
  private authListenerSubs = new Subscription();
  public user: string;
  public isAuthenticated: boolean = false;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    public router:Router,
    private authService: AuthentificationService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    if(this.user != "") {
      this.handleSubscription();
      this.loadCartItems();
    } 
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calcCartTotal();
    })
  }

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.prix)
    })
  }

  payer() {
    this.cartService.clearCart().subscribe((items) => {
      this.cartItems = [];
      this.cartTotal = 0
    });
  }
}
