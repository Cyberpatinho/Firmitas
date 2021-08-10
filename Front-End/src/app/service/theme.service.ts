import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>("http://localhost:8080/tema", this.token);
  }

  getThemeById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`http://localhost:8080/tema/${id}`, this.token);
  }

  postTheme(theme: Theme): Observable<Theme> { 
    return this.http.post<Theme>("http://localhost:8080/tema", theme, this.token);
  }

  putTheme(theme: Theme): Observable<Theme> {
    return this.http.put<Theme>("http://localhost:8080/tema", theme, this.token);
  }

  deleteTheme(id: number): Observable<Theme> {
    return this.http.delete<Theme>(`http://localhost:8080/tema/${id}`, this.token);
  }

}
