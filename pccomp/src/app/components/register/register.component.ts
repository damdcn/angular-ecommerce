import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public utilisateur = {"nom":"",
                        "prénom":"",
                        "email":"",
                        "password":"",
                        "password2":""};
  public message: string = "";

  constructor(private authService: AuthentificationService,
    private router: Router) { 
  }

  ngOnInit(): void {
  }
  register(){
    this.message = "";
    if(this.utilisateur.password != this.utilisateur.password2){
      this.message = "Les mots de passent ne correspondent pas !";
      return;
    }
    let data = {
                "nom": this.utilisateur.nom,
                "prénom": this.utilisateur.prénom,
                "email": this.utilisateur.email,
                "password": this.utilisateur.password
                }
    this.authService.register(data).subscribe(reponse => {
      this.message = reponse['message'];
      if(reponse.resultat){
        this.router.navigate(['/login']);
      }
    });
  }
}
