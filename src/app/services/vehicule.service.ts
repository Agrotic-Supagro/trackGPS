

export class VehiculeService {
  // On trouvera dans vehicules sservices l'ensemble des appels à l'API suivant l'authentification
  // Les méthodes fonctionnent toutes de maniere similaire

  // tslint:disable-next-line:typedef
  RechercheVehicules(jwt: string) { // Le jwt est systematiquement necessaire pour recevoir une reponse de l'API
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + jwt);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    return fetch('https://app.samsys.io/api/v1/machines', requestOptions)
      .then(res => res.json()) // On retourne la reponse du serveur en la transformant en json
      // le format json est essentiel pour le traitement des données par la suite
      .catch(error => console.log('error', error));


  }
  // tslint:disable-next-line:typedef
  RechercheGeo(IDtravail, jwt: string){

    // @ts-ignore

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + jwt);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    return fetch('https://app.samsys.io/api/v1/works/' + IDtravail + '/geolocations', requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

  }
  // tslint:disable-next-line:typedef
  RechercheTravaux(datedebut: string, datefin: string, vehicules: any[], vehiculeName: string, jwt: string){
    console.log(vehicules);
    let vehiculeID;
    for (const vehicule of vehicules) { // On cherche le vehicule selectionné par son nom dans la liste des vehicules pour determiner son ID
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
    // tslint:disable-next-line:max-line-length
    return fetch('https://app.samsys.io/api/v1/machines/' + vehiculeID + '/works?start_date=' + datedebut + '&end_date=' + datefin, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }
}
