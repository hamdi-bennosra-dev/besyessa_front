import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = '/v1/product'; // URL backend

  constructor(private http: HttpClient) {}

  // GET all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  // GET available products
  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/available`);
  }

  // GET loaned products (admin only)
  getLoanedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/loaned`);
  }

  // GET a product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // POST create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  // PUT update a product
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  // DELETE a product by ID
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // PUT loan a product (update availability status)
  loanProduct(id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/loan/${id}`, {});
  }
}
