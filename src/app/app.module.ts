import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AuthComponent } from './auth/auth.component';
import { VehiculeViewComponent } from './vehicule-view/vehicule-view.component';
import { VehiculeService} from './services/vehicule.service';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import {AuthGuard} from './services/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';



const appRoutes: Routes = [ // Liste des routes du programme
  {path: 'vehicules', canActivate: [AuthGuard], component: VehiculeViewComponent}, // Page de recherche des points GPS à partir des Vehicules
  // Proteger par AuthGuard
  {path: 'auth', component: AuthComponent}, // Page de connexion
  {path: '', component: AuthComponent}, // Si l'on ne met rien on est redirigé vers le menu d'authentification
  {path: 'not-found', component: FourOhFourComponent}, // Permet de gerer les erreurs d'url
  {path: '**', redirectTo: '/not-found'} // Toutes les routes non spécifiées ici sont supposées inexistantes, on ramene donc à la page 404
];
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AuthComponent,
    VehiculeViewComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    VehiculeService,
    AuthService,
    AuthGuard,
    AuthComponent,
    VehiculeViewComponent,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
