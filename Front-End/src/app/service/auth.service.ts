import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>("http://localhost:8080/usuarios/logar", userLogin);
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8080/usuarios/cadastrar", user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`);
  }

  loggedIn() {
    let ok: boolean = false;
    if (environment.token != "") {
      ok = true;
    }
    return ok;
  }

}
