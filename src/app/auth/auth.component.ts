import {Component, Injectable, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {VehiculeViewComponent} from '../vehicule-view/vehicule-view.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

@Injectable()
export class AuthComponent implements OnInit {

  adressemail: string;
  motdepasse: string;
  authStatus: boolean;
  jwt: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  // tslint:disable-next-line:typedef
  onSubmitAuth(form: NgForm){
    this.adressemail = form.value.adressemail;
    this.motdepasse = form.value.motdepasse;
    this.onSignIn();// Lance le programme de connexion ci dessous
  }
  // tslint:disable-next-line:typedef
  onSignIn(){
    this.authService.signIn(this.adressemail, this.motdepasse).then( // Renvoie un message contenant le jwt
      (result) =>
    {
      this.jwt = result.jwt;
      if (result.status === 'ok') { // Dans le message si le status est ok c'est que la connexion est reussie
        console.log('Connexion reussie !');
        this.authService.isAuth = true; // Confirme la connexion dans le programme
        this.authService.SaveJWT(this.jwt); // Enregistre le JWT dans authService pour simplifier son obtention ailleurs
        this.router.navigateByUrl('/vehicules');
        this.authStatus = this.authService.isAuth; // this.authStatus suit la valeur de this.authService.isAuth pour activer ou desactiver le bouton de connexion
        alert('Connexion reussie ! Bienvenue ' + this.adressemail);
      }
      else {
        alert('Erreur, veuillez réessayer ! ');
      }
    }
    )
    .then( () => {
      }
    );

  }
  // tslint:disable-next-line:typedef
  onSignOut(){
    this.authService.signOut(); // == this.authService.isAuth = false;
    this.authStatus = this.authService.isAuth;
  }


  // tslint:disable-next-line:typedef
}
