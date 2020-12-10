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

  @Input() adressemail: string;
  @Input() motdepasse: string;
  authStatus: boolean;
  result: string;
  jwt: string;
  posts: any;
  constructor(private authService: AuthService, private router: Router, private vehiculeview: VehiculeViewComponent) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  // tslint:disable-next-line:typedef
  onSignIn(){
    this.authService.signIn(this.adressemail, this.motdepasse).then(
      (result) =>
    {
      this.result = result;
      // @ts-ignore
      this.jwt = this.result.jwt;
      console.log(this.jwt);
      if (result.status === 'ok') {
        console.log('Connexion reussie !');
        this.authService.isAuth = true;
        this.authService.SaveJWT(this.jwt);
        this.vehiculeview.onChercherVehicule();
        this.router.navigateByUrl('/vehicules');
        this.authStatus = this.authService.isAuth;
      }
    }
    )
    .then( () => {
      console.log(this.result);
      }
    );

  }
  // tslint:disable-next-line:typedef
  onSignIn1(){
    this.posts = this.authService.signIn1(this.adressemail, this.motdepasse);
    console.log(this.posts.json);
  }
  // tslint:disable-next-line:typedef
  onSignOut(){
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

  // tslint:disable-next-line:typedef
  onSubmitAuth(form: NgForm){
    console.log(form.value);
    this.adressemail = form.value.adressemail;
    this.motdepasse = form.value.motdepasse;
    this.onSignIn();
  }
  // tslint:disable-next-line:typedef
}
