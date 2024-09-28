import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl = '/product/brands'; 

  constructor(private http: HttpClient) {}

  
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}`);
  }

  
  getBrandById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/${id}`);
  }

 
  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}`, brand);
  }

  
  updateBrand(id: string, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.baseUrl}/${id}`, brand);
  }

  
  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
