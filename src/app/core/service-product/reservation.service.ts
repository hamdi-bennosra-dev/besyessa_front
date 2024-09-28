import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = '/v1/product/reservations';  // URL backend

  constructor(private http: HttpClient) {}

  // POST create or update a reservation
  createOrUpdateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.baseUrl, reservation);
  }

  // GET a reservation by ID
  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }

  // GET all reservations
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  // DELETE a reservation by ID
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
