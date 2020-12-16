import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: string;
  public isAuthenticated: boolean = false;
  private authListenerSubs = new Subscription();
  

  constructor(private authService: AuthentificationService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

}
