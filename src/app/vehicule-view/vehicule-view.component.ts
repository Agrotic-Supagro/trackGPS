import { Component, OnInit } from '@angular/core';
import {VehiculeService} from '../services/vehicule.service';
import {NgForm} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-vehicule-view',
  templateUrl: './vehicule-view.component.html',
  styleUrls: ['./vehicule-view.component.scss']
})
export class VehiculeViewComponent implements OnInit {

  title = 'Youpi je m\'appelle Arthur';
  isAuth = true;
  isRempli = true;
  vehicules: any[];
  Vehiculewanted: string;
  datefin: string;
  datedebut: string;
  dateajd;
  format = 'dd/MM/yyyy';
  locale = 'en-FR';
  private result: any;
  authjwtSubscription: Subscription;
  jwt: string;

  constructor(private vehiculeservice: VehiculeService, private authservice: AuthService, public datepipe: DatePipe) {
    this.dateajd = new Date();
    // @ts-ignore
    this.dateajd = formatDate(this.dateajd, this.format, this.locale);

  }
  ngOnInit(): void {
    this.OnRechercheVehicules();
  }

  onChercherVehicule(): void {
    console.log('GROS  TEST DE FIFOU');
  }
  // tslint:disable-next-line:typedef
  onAllumer(){
    this.vehiculeservice.switchOnAll();
  }
  // tslint:disable-next-line:typedef
  onEteindre(){
    this.vehiculeservice.switchOffAll();
  }
  // tslint:disable-next-line:typedef
  OnRechercheVehicules(){
    console.log(this.authservice.jwt);
    this.vehiculeservice.RechercheVehicules(this.authservice.jwt).then(
      (result) =>
      {
        // @ts-ignore
        this.result = result;
        // @ts-ignore
        if (result !== 'msg') {
          console.log('Donnée reçues !');
        }
      }
    )
      .then( () => {
        this.vehicules = this.result;
        this.vehiculeservice.vehicules = this.result;
        }
      );
  }

  // tslint:disable-next-line:typedef
  onRechercheTravaux(){
    this.vehiculeservice.RechercheTravaux(this.datedebut, this.datefin, this.Vehiculewanted, this.authservice.jwt).then(
      (result) =>
      {
        // @ts-ignore
        this.result = result;
        console.log(this.result);
        // @ts-ignore
        if (result[0] !== 'msg') {
          console.log('Donnée reçues !');
        }
      }
    )
      .then( () => {

      }
      );
  }

  // tslint:disable-next-line:typedef
  onSubmitRecherche(form: NgForm){
    console.log(form.value);
    console.log(this.authservice.jwt);
    // this.datedebut = form.value.datedebut;
    this.datedebut = this.datepipe.transform(form.value.datedebut, 'yyyy-MM-dd');
    // this.datefin = form.value.datefin;
    this.datefin = this.datepipe.transform(form.value.datefin, 'yyyy-MM-dd');
    console.log(this.datedebut, this.datefin);
    this.Vehiculewanted = form.value.vehiculename;
    this.onRechercheTravaux();
  }
}
