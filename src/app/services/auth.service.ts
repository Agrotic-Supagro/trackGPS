
export class AuthService {
  isAuth = false; // Variable indiquant la connexion ou non au service
  jwt: string;

  // tslint:disable-next-line:typedef
  signIn(adressemail: string, motdepasse: string) {
        const requestOptions = {
          method: 'POST',
          redirect: 'follow'
        };
        // @ts-ignore
        return fetch('https://app.samsys.io/api/v1/auth?email=' + adressemail + '&password=' + motdepasse, requestOptions)
          .then(res => res.json())
          .catch(error => console.log('error', error));
  }
  // tslint:disable-next-line:typedef
  signOut() {
            this.isAuth = false;
  }

  // tslint:disable-next-line:typedef
  SaveJWT(Jwt: string){ // Permet d'enregistrer le jwt dans le service et ainsi d'y avoir acces dans le reste du programme
    this.jwt = Jwt;
  }
/*.then( res => {
  if (res.status === 'ok'){
  this.isAuth = true;
}
}*/


  /*
    signIn(adressemail: string, motdepasse: string) {
      let reussi: boolean;
      const promise = new Promise(
        (resolve, reject) => {
          const requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };

          // @ts-ignore
          fetch('https://app.samsys.io/api/v1/auth?email=' + adressemail + '&password=' + motdepasse, requestOptions)
            .then(
          // tslint:disable-next-line:only-arrow-functions typedef
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);

              reussi = false;
              reject(true);
            }

            // Examine the text in the response
            // tslint:disable-next-line:only-arrow-functions typedef
            response.json().then(function(data) {
              console.log(data);
              reussi = true;
              resolve(true);
            });
          }
        )
        // tslint:disable-next-line:only-arrow-functions typedef
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });

        }
      );
      if (reussi)
      {
        this.isAuth = true;
      }
      else {
        this.isAuth = false;
      }
      return promise;
    }*/
}

