import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from 'src/app/models/price';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private baseUrl = '/product/prices'; 

  constructor(private http: HttpClient) {}

 
  getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(`${this.baseUrl}`);
  }

  
  getPriceById(id: string): Observable<Price> {
    return this.http.get<Price>(`${this.baseUrl}/${id}`);
  }

  
  createOrUpdatePrice(price: Price): Observable<Price> {
    return this.http.post<Price>(`${this.baseUrl}`, price);
  }

  
  deletePrice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
