import { Injectable } from '@angular/core';
import { Activity } from './Activity';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Node/Express API
  REST_API: string = 'http://localhost:3000/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  options = { headers: this.headers };
  

  constructor(private httpClient: HttpClient) { }

  // Get all objects
  GetActivities() {
    return this.httpClient.get(`${this.REST_API}getActivities`);
  }

  // Create objects
  CreateActivities(activity:FormData):Observable<any>{
  console.log(activity);
      return this.httpClient.post(`${this.REST_API}createActivities`, activity);
  }

  // Delete objects
  DeleteActivities(id: String){
    return this.httpClient.delete(`${this.REST_API}deleteActivities/${id}`);
  }

  // Update objects
  selectedActivity: Subject<Activity> = new Subject<Activity>();
  UpdateActivities(activity:FormData, id:String):Observable<any>{
    return this.httpClient.put(`${this.REST_API}updateActivities/${id}`,activity);
  }

  // Search objects
  searchActivities(keyword: string) {
    return this.httpClient.get<any>(`${this.REST_API}searchActivities?keyword=${keyword}`);
  }

  //Comprobar rol
  consultarRol(keyword: string) {
    return this.httpClient.get<any>(`${this.REST_API}consultarRol?keyword=${keyword}`);
  }
}