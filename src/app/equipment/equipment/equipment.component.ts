import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/models/equipment';
import { EquipmentService } from 'src/app/services/equipment.service';

declare var bootstrap: any;

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  currentEquipment: Equipment = {
    entCapExType: '',
    equipmentDescription: '',
    supplier: '',
    unitPriceMinus2: 0,
    unitPriceMinus1: 0,
    unitPrice: 0,
    priceIncreasePerYear: 0
  };
  isEditing = false;

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    this.loadEquipments();
  }

  loadEquipments() {
    this.equipmentService.getAllEquipment().subscribe({
      next: (data) => {
        this.equipments = data;
      },
      error: (error) => {
        console.error('Error loading equipment:', error);
      }
    });
  }

  deleteEquipment(id: number | undefined) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id).subscribe({
        next: () => {
          this.loadEquipments();
          alert('Equipment deleted successfully!');
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error deleting equipment.');
        }
      });
    }
  }

  openAddModal() {
    this.isEditing = false;
    this.resetForm();
    new bootstrap.Modal(document.getElementById('equipmentModal')).show();
  }

  openEditModal(equipment: Equipment) {
    this.isEditing = true;
    this.currentEquipment = { ...equipment };
    new bootstrap.Modal(document.getElementById('equipmentModal')).show();
  }

  saveEquipment() {
    const modalElement = document.getElementById('equipmentModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
  
    // Simulating logged-in user (Replace with actual user ID from auth service)
    const loggedInUserId = 1;  // TODO: Fetch the actual logged-in user ID
  
    // Ensure the request includes the user object
    const requestPayload = {
      ...this.currentEquipment,
      user: { id: loggedInUserId }  // Add user ID here
    };
  
    console.log("Sending Data:", requestPayload); // Debugging
  
    const request = this.isEditing && this.currentEquipment.id
      ? this.equipmentService.updateEquipment(this.currentEquipment.id, requestPayload)
      : this.equipmentService.createEquipment(requestPayload);
  
    request.subscribe({
      next: () => {
        this.loadEquipments();
        modal?.hide();
        this.resetForm();
        alert(this.isEditing ? 'Equipment updated successfully!' : 'Equipment added successfully!');
      },
      error: (error) => {
        console.error("Error:", error);
        console.error("Backend Response:", error.error); // Log backend error
        alert("Error occurred. Please check the data and try again.");
      }
    });
  }
  

  resetForm() {
    this.currentEquipment = {
      entCapExType: '',
      equipmentDescription: '',
      supplier: '',
      unitPriceMinus2: null as any,
      unitPriceMinus1: null as any,
      unitPrice: null as any,
      priceIncreasePerYear: null as any
    };
  }
}