import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
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



const appRoutes: Routes = [
  {path: 'vehicules', canActivate: [AuthGuard], component: VehiculeViewComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AuthComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: '/not-found'}
];
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    VehiculeComponent,
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
