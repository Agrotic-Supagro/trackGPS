import {Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class AuthService {
  isAuth = false;

  // tslint:disable-next-line:typedef
  reponse: string;
  private http: HttpClient;

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
  signIn1(adressemail: string, motdepasse: string) {
    return this.http.get('https://app.samsys.io/api/v1/auth?email=' + adressemail + '&password=' + motdepasse);
  }
  // tslint:disable-next-line:typedef
  signOut() {
            this.isAuth = false;
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

