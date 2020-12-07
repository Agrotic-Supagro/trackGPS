import { Component, OnInit } from '@angular/core';
import {VehiculeService} from '../services/vehicule.service';
import {NgForm} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Subscription} from 'rxjs';
import {AuthComponent} from '../auth/auth.component';
import {BepJsonWriter} from '@angular/cli/utilities/bep';
import {AuthService} from '../services/auth.service';


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

  constructor(private vehiculeservice: VehiculeService, ) {
    this.dateajd = new Date();
    // @ts-ignore
    this.dateajd = formatDate(this.dateajd, this.format, this.locale);

  }
  ngOnInit(): void {
    this.vehicules = this.vehiculeservice.vehicules;
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
  onRechercheTravaux(){
    console.log('allo')
    this.vehiculeservice.RechercheTravaux(this.datedebut, this.datefin, this.authservice.jwt).then(
      (result) =>
      {
        this.result = result;
        // @ts-ignore
        if (result.status === 'ok') {
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
    this.datedebut = form.value.datedebut;
    this.datefin = form.value.datefin;
    this.Vehiculewanted = form.value.vehiculename;
    this.onRechercheTravaux();
  }
}
