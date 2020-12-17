import { Component, OnInit } from '@angular/core';
import {VehiculeService} from '../services/vehicule.service';
import {NgForm} from '@angular/forms';
import {formatDate} from '@angular/common';
import {AuthService} from '../services/auth.service';
import { DatePipe } from '@angular/common';
// Import nécessaire

@Component({
  selector: 'app-vehicule-view',
  templateUrl: './vehicule-view.component.html',
  styleUrls: ['./vehicule-view.component.scss']
})
export class VehiculeViewComponent implements OnInit {
  vehicules: any[];
  Vehiculewanted: string;
  datefin: string; // Date de début des travaux à exporter
  datedebut: string; // Date de fin des travaux à exporter
  dateajd;
  format = 'dd/MM/yyyy';
  locale = 'en-FR';
  travaux: any[]; // Liste des travaux rempli lors de l'appel à l'API
  cpttravaux = 0; // Compteur pour circuler au sein des travaux
  csv: string; // Fichier CSV dans lequel seront entrées les données recherchées

  // Nous allons avoir besoin des différents services du programme
  constructor(private vehiculeservice: VehiculeService, private authservice: AuthService, public datepipe: DatePipe) {
    this.dateajd = new Date();
    // @ts-ignore
    this.dateajd = formatDate(this.dateajd, this.format, this.locale);
    this.csv = 'Date,X,Y,Vitesse\n'; // Les cases CSV seront entrés dans cet ordre
  }

  ngOnInit(): void { // Lorsqu'on arrive sur la page on lance une recherche des vehicules enregistrés sur la base de données
    // Avec la méthode suivante :
    this.OnRechercheVehicules();
  }

  // tslint:disable-next-line:typedef
  OnRechercheVehicules(){
    this.vehiculeservice.RechercheVehicules(this.authservice.jwt).then( // RechercheVehicules retourne la liste des vehicules enregistrés
      (result) =>
      {
        this.vehicules = result; // On enregistre directement la réponse dans une variable
        console.log('Donnée reçues !'); // On assume que les données ont été reçu l'API étant insufisante pour dire s'il y a eu une erreur
      }
    )
      .then( () => {
        }
      );
  }

  // tslint:disable-next-line:typedef
  onSubmitRecherche(form: NgForm){
    this.datedebut = this.datepipe.transform(form.value.datedebut, 'yyyy-MM-dd');
    this.datefin = this.datepipe.transform(form.value.datefin, 'yyyy-MM-dd'); // On enregistre les dates saisies et on les mets dans
    // un format utilisable par l'API
    this.Vehiculewanted = form.value.vehiculename;
    this.onRechercheTravaux(); // On lance la recherche des travaux du vehicules qui menera à l'export des données GPS
  }

  // tslint:disable-next-line:typedef
  onRechercheTravaux(){
    this.vehiculeservice.RechercheTravaux(this.datedebut, this.datefin, this.vehicules, this.Vehiculewanted, this.authservice.jwt).then(
      (result) => // RechercheTravaux retourne la liste des travaux enregistrés sur la période donnée
      {
        this.travaux = result; // On enregistre directement la réponse dans une variable
        console.log('Donnée reçues !');
      }
    )
      .then( () => { // Une fois qu'on a la liste des travaux on réalise autant de requete des points GPS qu'il y a de travaux
        for (const travail of this.travaux){
          this.onRechercheGeo(this.travaux[this.cpttravaux].id); // On lance la recherche des points GPS d'un travail à partir de son ID
          this.cpttravaux = this.cpttravaux + 1;
          if (this.cpttravaux === this.travaux.length){ // Une fois à la derniere requete on affiche un message de confirmation
            alert('Données reçues !');
          }
        }
      }
      ).then( () => {
    });
  }

  // tslint:disable-next-line:typedef
  onRechercheGeo(IDtravail){

    // @ts-ignore
    this.vehiculeservice.RechercheGeo(IDtravail, this.authservice.jwt).then(
      (result) =>
      {
        // @ts-ignore
        this.result = result;
        // @ts-ignore
        result.forEach((ligne) => { // Pour chaque ligne cad chaque points GPS on enregitre une ligne de données dans le CSV
          this.csv += ligne.properties.t;
          this.csv += ','; // On separe d'une virgule les informations
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
        }
      );

  }

  // tslint:disable-next-line:typedef
  download_csv() {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.csv); // Permet d'encoder
    hiddenElement.target = '_blank';
    hiddenElement.download = 'DonnéesGPS.csv'; // Donne le nom au fichier
    hiddenElement.click();
  }
}
