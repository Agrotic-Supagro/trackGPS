import {Component, Input, OnInit} from '@angular/core';
import {VehiculeService} from '../services/vehicule.service';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {
  @Input() Vehiculename: string;
  @Input() VehiculeID: string;
  @Input() IndexofVehicule: number;

  constructor(private vehiculeservice: VehiculeService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSwitchOn() {
    console.log('GROS BISOUS');
    this.vehiculeservice.switchOnOne(this.IndexofVehicule)
  }
}
