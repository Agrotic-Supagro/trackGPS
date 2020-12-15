

export class VehiculeService {
  vehicules: any[];
  jwt: string;

  // tslint:disable-next-line:typedef
  switchOnAll(){
    for (const vehicule of this.vehicules)
    {vehicule.name = 'Valider1'; }
  }
  // tslint:disable-next-line:typedef
  switchOffAll(){
    for (const vehicule of this.vehicules)
    {vehicule.name = 'Valider2'; }
  }
  // tslint:disable-next-line:typedef
  switchOnOne(index: number){
    this.vehicules[index].name = 'test';
  }

  // tslint:disable-next-line:typedef
  RechercheVehicules(jwt: string) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + jwt);
    this.jwt = jwt;
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    return fetch('https://app.samsys.io/api/v1/machines', requestOptions)
      .then(res => res.json())
      .catch(error => console.log('error', error));


  }
  // tslint:disable-next-line:typedef
  RechercheGeo(travail, jwt: string){

    // @ts-ignore

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + this.jwt);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    return fetch('https://app.samsys.io/api/v1/works/' + travail + '/geolocations', requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

  }
  // tslint:disable-next-line:typedef
  RechercheTravaux(datedebut: string, datefin: string, vehiculeName: string, jwt: string){
    console.log(this.vehicules);
    let vehiculeID;
    for (const vehicule of this.vehicules) {
      if (vehicule.name === vehiculeName) {
        vehiculeID = vehicule.id;
      }
    }
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + jwt);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore

    // tslint:disable-next-line:max-line-length
   // fetch('https://app.samsys.io/api/v1/machines/' + vehiculeID + '/works?start_date=' + datedebut + '&end_date=' + datefin, requestOptions)
    // tslint:disable-next-line:max-line-length

    // tslint:disable-next-line:no-shadowed-variable
    // @ts-ignore
    return fetch('https://app.samsys.io/api/v1/machines/' + vehiculeID + '/works?start_date=' + datedebut + '&end_date=' + datefin, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }
}
