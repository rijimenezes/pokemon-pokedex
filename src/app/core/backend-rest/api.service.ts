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

  /**
   * Consumir rutas get de un backend
   * @param route ruta a la que se va a mandar la peticion
   * @param params parametros que se enviaran en la peticion
   * @returns Observable con la respuesta del backend
   */
  get(route: string, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      this.applyParams(params, options);
    }
    return this.http.get(`${URL}/${route}`, options);
  }

  /**
   * Consumir rutas post de un backend
   * @param route ruta a la que se va a mandar la peticion
   * @param params parametros que se enviaran en la peticion
   * @param body cuerpo que se enviaran en la peticion
   * @returns Observable con la respuesta del backend
   */
  post(route: string, body: any, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      this.applyParams(params, options);
    }
    return this.http.post(`${URL}/${route}`, body, options);
  }
  /**
   * Consumir rutas put de un backend
   * @param route ruta a la que se va a mandar la peticion
   * @param params parametros que se enviaran en la peticion
   * @param body cuerpo que se enviaran en la peticion
   * @returns Observable con la respuesta del backend
   */
  put(route: string, body: any, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      this.applyParams(params, options);
    }
    return this.http.put(`${URL}/${route}`, body, options);
  }

  /**
   * Consumir rutas delete de un backend
   * @param route ruta a la que se va a mandar la peticion
   * @param params parametros que se enviaran en la peticion
   * @returns Observable con la respuesta del backend
   */
  delete(route: string, params?: any): Observable<any> {
    const options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: this.headers,
    };
    if (params) {
      this.applyParams(params, options);
    }
    return this.http.delete(`${URL}/${route}`, options);
  }

  /**
   * Asignar parametros a las rutas
   * @param params parametros a agregar a las rutas
   * @param options opciones donde se actualizaran los parametros a envar a las rutas
   */
  private applyParams(
    params: any,
    options: { headers: HttpHeaders; params?: HttpParams }
  ) {
    let localParams = new HttpParams();
    Object.keys(params).forEach((paramKey: string) => {
      if (params[paramKey] !== undefined) {
        localParams = localParams.append(paramKey, params[paramKey]);
      }
    });
    options.params = localParams;
  }
}
