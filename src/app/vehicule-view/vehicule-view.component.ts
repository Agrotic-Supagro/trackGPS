import { Component, OnInit } from '@angular/core';
import {VehiculeService} from '../services/vehicule.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-vehicule-view',
  templateUrl: './vehicule-view.component.html',
  styleUrls: ['./vehicule-view.component.scss']
})
export class VehiculeViewComponent implements OnInit {

  title = 'Youpi je m\'appelle Arthur';
  allo = 'allo';
  isAuth = true;
  isRempli = true;
  vehicules: any[];
  constructor(private vehiculeservice: VehiculeService) { }
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

  // tslint:disable-next-line:typedef
  onSubmitRecherche(form: NgForm){console.log(form.value); }

}
