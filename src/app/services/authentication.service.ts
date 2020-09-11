import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    loggedIn: boolean;
    logInResults: any;

    constructor(private router: Router, private storage: Storage, private http: HttpClient) {
    }

    async isLoggedIn(): Promise<boolean> {
        await this.storage.get('LoggedIn').then(data => {
            console.log(data);
            this.loggedIn = (data === 'true' ? true : false);
        });
        return this.loggedIn;
    }


        async login(credentials: any) {
            await this.http.post('https://reqres.in/api/', credentials).toPromise().then((data) => {
                if (data['status'] === 'success') {
                    this.storage.set('LoggedIn', true);
                }
                this.logInResults = data;
            });
            return this.logInResults;
        }


    logout() {
        this.storage.remove('LoggedIn').then(() => {
            this.router.navigate(['log-in']);
        });
    }

}
