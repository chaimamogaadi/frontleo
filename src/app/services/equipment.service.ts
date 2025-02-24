import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private baseUrl = 'http://localhost:8094/home/api/equipment';

  constructor(private http: HttpClient) { }

  createEquipment(equipment: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, equipment, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  updateEquipment(id: number, equipment: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, equipment, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  

  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.baseUrl);
  }

  getEquipmentDescriptions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/equipment-descriptions`);
  }

  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`);
  }



  deleteEquipment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
