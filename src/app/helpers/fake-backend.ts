import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

const users = JSON.parse(localStorage.getItem("users")) || [];

@Injectable()
export class FakeBackend implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/users") && method === "GET":
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === "Delete":
          return deleteUser();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return Error("Username or password is incorrect");
      }
      return ok({
        id: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: "fake-jwt-token",
      });
    }

    function getUsers() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      user = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem("users", JSON.stringify(users));
      return ok();
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorized" } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackEndProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackend,
  multi: true,
};
