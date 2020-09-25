import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  authenticated: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) {
    console.log(route);
    console.log(routeState.url);

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: routeState.url },
    });
    return false;
  }
}
