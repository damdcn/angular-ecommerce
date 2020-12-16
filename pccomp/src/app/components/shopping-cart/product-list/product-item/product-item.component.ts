import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification.service';
import { CartService } from 'src/app/cart.service'
import { MessengerService } from 'src/app/messenger.service'
import { ProductDescriptionComponent } from 'src/app/product-description/product-description.component';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  private authListenerSubs = new Subscription();
  public isAuthenticated: boolean = false;

  @Input() productItem:any;

  constructor(private msg : MessengerService,
    private cartService: CartService,
    private authService: AuthentificationService, 
    private router: Router) { 
  }
  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  
  handleAddToCart() {
    this.cartService.addProductToCart(this.productItem).subscribe((res:any) => {
      this.msg.sendMsg(this.productItem)
    })
  }

  handleClearCart() {
    this.cartService.clearCart().subscribe((res:any) => {
      this.msg.sendMsg(this.productItem)
    })
  }

  handleViewProduct(productItem: any){
    this.router.navigate(['/description/'+productItem._id])
    //this.msg.sendMsg(this.productItem);
  }
}
