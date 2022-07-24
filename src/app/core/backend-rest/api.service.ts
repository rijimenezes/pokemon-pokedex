import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'https://bp-pokemons.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}
  get(route: string, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      let localParams = new HttpParams();
      Object.keys(params).forEach((paramKey: string) => {
        if (params[paramKey] !== undefined) {
          localParams = localParams.append(paramKey, params[paramKey]);
        }
      });
      options.params = localParams;
    }
    return this.http.get(`${URL}/${route}`, options);
  }

  post(route: string, body: any, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      let localParams = new HttpParams();
      Object.keys(params).forEach((paramKey: string) => {
        if (params[paramKey] !== undefined) {
          localParams = localParams.append(paramKey, params[paramKey]);
        }
      });
      options.params = localParams;
    }
    return this.http.post(`${URL}/${route}`, body, options);
  }

  put(route: string, body: any, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      let localParams = new HttpParams();
      Object.keys(params).forEach((paramKey: string) => {
        if (params[paramKey] !== undefined) {
          localParams = localParams.append(paramKey, params[paramKey]);
        }
      });
      options.params = localParams;
    }
    return this.http.put(`${URL}/${route}`, body, options);
  }

  delete(route: string, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      let localParams = new HttpParams();
      Object.keys(params).forEach((paramKey: string) => {
        if (params[paramKey] !== undefined) {
          localParams = localParams.append(paramKey, params[paramKey]);
        }
      });
      options.params = localParams;
    }
    return this.http.delete(`${URL}/${route}`, options);
  }
}
