import { Injectable } from '@angular/core';
import { IndustrializationPlan } from '../models/IndustrializationPlan';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndustrializationPlanService {
  private apiUrl = 'http://localhost:8094/home/api/industrialization-plans';

  constructor(private http: HttpClient) { }

  getAllPlans(): Observable<IndustrializationPlan[]> {
    return this.http.get<IndustrializationPlan[]>(this.apiUrl);
  }

  getPlanById(id: number): Observable<IndustrializationPlan> {
    return this.http.get<IndustrializationPlan>(`${this.apiUrl}/${id}`);
  }

  createPlan(plan: IndustrializationPlan): Observable<IndustrializationPlan> {
    return this.http.post<IndustrializationPlan>(this.apiUrl, plan);
  }

  updatePlan(id: number, plan: IndustrializationPlan): Observable<IndustrializationPlan> {
    return this.http.put<IndustrializationPlan>(`${this.apiUrl}/${id}`, plan);
  }
}