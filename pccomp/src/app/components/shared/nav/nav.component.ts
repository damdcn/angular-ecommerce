import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from 'src/app/messenger.service';
import { ProduitsService } from 'src/app/produits-service.service';
import { ProductListComponent } from '../../shopping-cart/product-list/product-list.component';

import { AuthentificationService } from '../../../authentification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  name:any="";
  private authListenerSubs = new Subscription();
  public user: string;
  public isAuthenticated: boolean = false;

  constructor(private produitsService : ProduitsService,
    private msg:MessengerService,
    private route: ActivatedRoute,
    private router:Router,
    private authService: AuthentificationService) {
      this.user = this.authService.getUser();
    }
  
  ngOnInit(): void {
    this.router.navigate(['/shop']);
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  applyFilter(){
    this.msg.sendMsg(this.name);
  }

  deconnexion(){
    this.authService.disconnect();
    this.router.navigate(['/shop']);
  }
}
