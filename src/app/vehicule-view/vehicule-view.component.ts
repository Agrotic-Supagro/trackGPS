import { Component, OnInit } from '@angular/core';
import {VehiculeService} from '../services/vehicule.service';
import {AuthComponent} from '../auth/auth.component';
import {NgForm} from '@angular/forms';
import {formatDate} from '@angular/common';


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
  constructor(private vehiculeservice: VehiculeService, private authcomponent: AuthComponent) {
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
    this.vehiculeservice.RechercheTravaux(this.datedebut, this.datefin, this.authcomponent.jwt).then(
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
    console.log(this.authcomponent.jwt);
    this.datedebut = form.value.datedebut;
    this.datefin = form.value.datefin;
    this.Vehiculewanted = form.value.vehiculename;
    this.onRechercheTravaux();
}
