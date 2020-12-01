export class VehiculeService {
  vehicules = [
    {
      id: '5b27cafd185c394b7657d60b', name: 'Claas Seb'
    },
    {
      id: '5b27cb40185c394b72b3ba67', name: 'Claas Hugues'
    },
    {
      id: '5c7692823666ac2d22fe1615', name: 'Pulvé culture'
    },
    {
      id: '5cdc26f53666ac4fe9d501c0', name: 'test'
    },
    {
      id: '5d0a15eb3666ac774707fcbe', name: 'Poudreuse'
    },
    {
      id: '5dc2ca6fed77f2bd4684e53e', name: 'Semoir 3m'
    },
    {
      id: '5dc2def89550249c1fe81d47', name: 'Tracteur John Deere'
    },
    {
      id: '5e206ec24b05364d8322f2aa', name: 'Distributeur à engrais'
    },
    {
      id: '5e3ab94663813180cd3de161', name: 'Dionis 4M'
    },
    {
      id: '5e4bdc20512032abcb557281', name: 'Rampe à désherber vigne'
    },
    {
      id: '5f6b07a24d703ea0fb8361e5', name: 'Machine à vendanger'
    },
    {
      id: '5f85456efca92543d6cd2f59', name: 'Rouleau grande culture'
    },
    {
      id: '5c81335c3666ac2d1d8894ab', name: 'Charrue 6 socs'
    }
  ];

  switchOnAll(){
    for (const vehicule of this.vehicules)
    {vehicule.name = 'Valider1'; }
  }
  switchOffAll(){
    for (const vehicule of this.vehicules)
    {vehicule.name = 'Valider2'; }
  }
  switchOnOne(index: number){
    this.vehicules[index].name = 'test';
  }

  RechercheTravaux(datedebut: string, datefin: string, jwt: string) {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    // @ts-ignore
    return fetch('https://app.samsys.io/api/v1/auth?email=' + adressemail + '&password=' + motdepasse, requestOptions)
      .then(res => res.json())
      .catch(error => console.log('error', error));
  }
}
