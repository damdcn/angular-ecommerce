import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { MessengerService } from 'src/app/messenger.service';

import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private cartService: CartService,private msg : MessengerService) { }
  @Input() cartItem: any
  CartComponentT:any;
  ngOnInit(): void {
  }

  handleDecreaseQty(){
    
     this.cartItem.qty--;
     return this.cartService.removeProductFromCart(this.cartItem).subscribe((res:any)=> {
     this.msg.sendMsg(this.cartItem);

  });
}

  handleIncreaseQty(){
     this.cartItem.qty++;
     return this.cartService.addProductToCart(this.cartItem).subscribe((res:any) => {
      this.msg.sendMsg(this.cartItem)
     });

       
     
  }
}
