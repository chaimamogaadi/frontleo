// src/app/models/equipment.model.ts
export interface Equipment {
    id?: number;
    entCapExType: string;
    equipmentDescription: string;
    unitPriceMinus2: number;
    unitPriceMinus1: number;
    unitPrice: number;
    supplier: string;
    priceIncreasePerYear: number;
}