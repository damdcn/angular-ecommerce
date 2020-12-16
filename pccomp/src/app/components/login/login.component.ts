import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../authentification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public utilisateur = {"email":"", "password":""};
  public message: string = "";
  
  constructor(private authService: AuthentificationService,
              private router: Router) { }

  login() {
    this.authService.verificationConnexion(this.utilisateur).subscribe(reponse => {
      // this.message = reponse['message'];
      // if (reponse['resultat']) {
      const ans = reponse;
      if(reponse.token){
        this.authService.connect(this.utilisateur.email, ans);
        this.router.navigate(['/']);
      }
      setTimeout( () => { this.router.navigate(['/']); }, 1000 );
    });
  }
}
