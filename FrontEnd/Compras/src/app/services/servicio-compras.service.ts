import { Injectable } from '@angular/core';
import { Compra } from './Compra';
import { Activity } from './Activity';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioComprasService {
 // Node/Express API
 REST_API: string = 'http://localhost:5000/';

 headers = new HttpHeaders({
   'Content-Type': 'application/json'
 });
 
 options = { headers: this.headers};

 constructor(private httpClient: HttpClient) { }

 // Get all objects
 GetActivities() {
   return this.httpClient.get(`${this.REST_API}getActivities`);
 }

  // Get all objects
 GetCompras(id: string) {
   return this.httpClient.get(`${this.REST_API}getCompras?keyword=${id}`);
 }
 selectedActivity: Subject<Activity> = new Subject<Activity>();
 id_cliente : Subject<String> = new Subject<String>();
 CreateCompras(compra: any): Observable<any> {
  return this.httpClient.post(`${this.REST_API}nuevasCompras`, compra);
}
   
 // Delete objects
 DeleteCompras(id: String){
   return this.httpClient.delete(`${this.REST_API}deleteCompras/${id}`);
 }

 // Update objects

 selectedCompra: Subject<Compra> = new Subject<Compra>();
 UpdateCompras(compra:FormData, id:String):Observable<any>{
   return this.httpClient.put(`${this.REST_API}updateCompras/${id}`,compra);
 }

 // Search objects
 searchActivities(keyword: string) {
   return this.httpClient.get<any>(`${this.REST_API}searchActivities?keyword=${keyword}`);
 }
  // Search objects
  searchCompras(id:string, keyword: string) {
    return this.httpClient.get<any>(`${this.REST_API}searchCompras/${id}?keyword=${keyword}`);
  }

 //Comprobar rol
 consultarRol(keyword: string) {
  return this.httpClient.get<any>(`${this.REST_API}consultarRol?keyword=${keyword}`);
 }
}