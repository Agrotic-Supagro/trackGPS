import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() adressemail: string;
  @Input() motdepasse: string;
  authStatus: boolean;
  result: string;
  posts: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  // tslint:disable-next-line:typedef
  onSignIn(){
    this.authService.signIn(this.adressemail, this.motdepasse).then(
      (result) =>
    {
      console.log(result);
      console.log('Connexion reussie !');
      if (result.status === 'ok') {
        this.authService.isAuth = true;
        this.authStatus = this.authService.isAuth;
        this.router.navigateByUrl('/vehicules');
      }
    }
    )
    .then( () => {

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
    this.onSignIn1();
  }
}
