import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private authListenerSubs = new Subscription();
  public user: string;
  public isAuthenticated: boolean = false;

  constructor(private authService: AuthentificationService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }



}
