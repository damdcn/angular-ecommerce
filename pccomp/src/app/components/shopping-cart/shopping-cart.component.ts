import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public user: string = "";
  public isAuthenticated: boolean = false;

  constructor(private authService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.authService.cast.subscribe(user => this.user = user);
    this.authService.cast2.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }



}
