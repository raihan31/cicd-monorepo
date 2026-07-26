import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '@cicd-monorepo/shared-contracts';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>('/api/products');
  }
}
