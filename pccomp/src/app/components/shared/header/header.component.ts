import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: string = "";
  public isAuthenticated: boolean = false;
  

  constructor(private authService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.authService.cast.subscribe(user => this.user = user);
    this.authService.cast2.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

}
