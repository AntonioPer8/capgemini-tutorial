import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Prestamo } from './model/Prestamo';
import { PrestamoPage } from './model/PrestamoPage';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PrestamoService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/prestamo';

    getPrestamos(pageable: Pageable, filters?: any): Observable<PrestamoPage> {
    const body: any = { pageable: pageable };

    if (filters) {
        body.nameClient = filters.nameClient ;
        body.nameGame = filters.nameGame ;
        body.date = filters.date ;
    }

    return this.http.post<PrestamoPage>(this.baseUrl, body).pipe(
        tap(data => {
        console.log("nameclients en el servicio: ", data.content.map(prestamo => prestamo.nameClients));
        })
    );
    }

    savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
        const { id } = prestamo;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Prestamo>(url, prestamo).pipe(
            tap(data => {
                console.log("Datos enviados en savePrestamo: ", prestamo);
                console.log("Respuesta del servidor: ", data);
            })
        );
    }

    deletePrestamo(idPrestamo: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idPrestamo}`);
    }
}

