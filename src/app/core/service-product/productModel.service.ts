import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/productModel';
//import { ProductModelAvailability } from '../models/product-model-availability.model'; // Modèle pour la disponibilité

@Injectable({
  providedIn: 'root',
})
export class ProductModelService {
  private baseUrl = '/v1/product/models'; // URL backend

  constructor(private http: HttpClient) {}

  
  getAllProductModels(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}`);
  }

  
  getProductModelById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }

  
  createProductModel(productModel: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.baseUrl}`, productModel);
  }

  
  updateProductModel(id: string, productModel: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/${id}`, productModel);
  }

  
  deleteProductModel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  
  /*getProductModelAvailability(): Observable<ProductModelAvailability[]> {
    return this.http.get<ProductModelAvailability[]>(`${this.baseUrl}/availability`);
  }*/
}
