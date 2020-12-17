import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate { // Permet de proteger le programme et de n'autoriser son acces qu'a quelqu'un de connecté
  constructor( private authService: AuthService,
               private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAuth){ // Si l'utilisateur est connecté on peut circuler
      return true;
    } else {
      this.router.navigate(['/auth']); // Sinon on reste sur la page de connexion
    }

  }

}
