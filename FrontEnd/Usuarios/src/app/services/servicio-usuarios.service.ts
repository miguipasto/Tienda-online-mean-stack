import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  // Node/Express API
  REST_API: string = 'http://localhost:4000/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  options = { headers: this.headers };
  

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any>(`${this.REST_API}getUsers`);
  }

  searchUsers(keyword: string) {
    return this.httpClient.get<any>(`${this.REST_API}searchUsers?keyword=${keyword}`);
  }

  creteUser(rol : string) {
    const requestBody = { rol : rol}
    return this.httpClient.post(`${this.REST_API}createUsers`,requestBody);
  }

  deleteUsers(id: String){
    return this.httpClient.delete(`${this.REST_API}deleteUsers/${id}`);
  }

  getUser(id: string) {
    return this.httpClient.get<any>(`${this.REST_API}getUsers/${id}`);
  }

  consultarRol(keyword: string) {
    return this.httpClient.get<any>(`${this.REST_API}getUsersByRol?keyword=${keyword}`);
  }
}