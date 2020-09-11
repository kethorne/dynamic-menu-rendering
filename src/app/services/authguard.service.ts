import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    authenticated: boolean;

    constructor( private authService: AuthenticationService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Promise<boolean> {
        console.log(route);
        console.log(routeState.url);

        await this.authService.isLoggedIn().then(data => {
            this.authenticated = data;
        });
        if (!this.authenticated) {
        await    this.router.navigate(['/log-in'], { queryParams: { target: routeState.url }});
        }
        if (this.authenticated) {
            return this.authenticated;
        }
    }
}
