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
  travaux: any[];
  geo: any[];
  authjwtSubscription: Subscription;
  jwt: string;
  cpt = 0;
  result;
  csv: string;
  precsv: string;

  constructor(private vehiculeservice: VehiculeService, private authservice: AuthService, public datepipe: DatePipe) {
    this.dateajd = new Date();
    // @ts-ignore
    this.dateajd = formatDate(this.dateajd, this.format, this.locale);
    this.csv = 'Date,X,Y,Vitesse\n';
    this.precsv = 'Date,X,Y,Vitesse\n';

  }
  ngOnInit(): void {
    this.OnRechercheVehicules();
  }

  // tslint:disable-next-line:typedef
  download_csv() {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'DonnéesGPS.csv';
    hiddenElement.click();
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
        this.vehicules = result;
        // @ts-ignore
        if (result !== 'msg') {
          console.log('Donnée reçues !');
        }
      }
    )
      .then( () => {
        this.vehiculeservice.vehicules = this.vehicules;
        }
      );
  }

  // tslint:disable-next-line:typedef
  onRechercheTravaux(){
    this.vehiculeservice.RechercheTravaux(this.datedebut, this.datefin, this.Vehiculewanted, this.authservice.jwt).then(
      (result) =>
      {
        // @ts-ignore
        this.travaux = result;
        this.geo = this.travaux;
        // @ts-ignore
        if (result[0] !== 'msg') {
          console.log('Donnée reçues !');
        }
      }
    )
      .then( () => {
        for (const travail of this.travaux){
          this.onRechercheGeo(this.travaux[this.cpt].id);
          this.geo[this.cpt] = this.result;
          this.cpt = this.cpt + 1;
          if (this.cpt === this.travaux.length){

            alert('test' + this.cpt + ' ' + this.travaux.length);

          }

        }
      }
      ).then( () => {

    });
  }

  // tslint:disable-next-line:typedef
  onRechercheGeo(travail){

    // @ts-ignore
    this.vehiculeservice.RechercheGeo(travail, this.authservice.jwt).then(
      (result) =>
      {
        // @ts-ignore
        this.result = result;
        console.log(result);
        // @ts-ignore
        result.forEach((ligne, index) => {
          this.csv += ligne.properties.t;
          this.csv += ',';
          this.csv += ligne.geometry.coordinates[0];
          this.csv += ',';
          this.csv += ligne.geometry.coordinates[1];
          this.csv += ',';
          this.csv += ligne.properties.speed;
          this.csv += '\n';
        });
        // @ts-ignore
        if (result[0] !== 'msg') {
          console.log('Donnée reçues !');
        }
      }
    )
      .then( () => {
        console.log(this.csv);
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
