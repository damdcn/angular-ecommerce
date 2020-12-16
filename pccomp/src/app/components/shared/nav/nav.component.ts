import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from 'src/app/messenger.service';
import { ProduitsService } from 'src/app/produits-service.service';
import { ProductListComponent } from '../../shopping-cart/product-list/product-list.component';

import { AuthentificationService } from '../../../authentification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  name:any="";
  public user: string ="";
  public isAuthenticated: boolean = false;

  constructor(private produitsService : ProduitsService,
    private msg:MessengerService,
    private route: ActivatedRoute,
    public router:Router,
    private authService: AuthentificationService) { }
  
  ngOnInit(): void {
    this.router.navigate(['/']);
    this.authService.cast2.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.authService.cast.subscribe(user => this.user = user);
  }

  applyFilter(){
    this.msg.sendMsg(this.name);
  }

  deconnexion(){
    this.authService.disconnect();
    this.router.navigate(['/']);
  }
}
