import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Clients } from './model/Clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor( private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/clients';

  getClients(): Observable<Clients[]> {
       return this.http.get<Clients[]>(this.baseUrl);
  }


  saveClients(clients: Clients): Observable<Clients> {
        const { id } = clients;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Clients>(url, clients);
  }

  deleteClients(idClients : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idClients}`);
  }  
}
