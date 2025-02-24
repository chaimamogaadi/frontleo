import { Component, OnInit } from '@angular/core';
import { IndustrializationPlan } from '../models/IndustrializationPlan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndustrializationPlanService } from '../services/industrialization-plan.service';
import { EquipmentService } from '../services/equipment.service';
import { Equipment } from '../models/equipment';

@Component({
  selector: 'app-industrialization-plan',
  templateUrl: './industrialization-plan.component.html',
  styleUrls: ['./industrialization-plan.component.css']
})
export class IndustrializationPlanComponent implements OnInit {
  plans: IndustrializationPlan[] = [];
  planForm: FormGroup;
  equipmentList: Equipment[] = [];
  selectedEquipment!: string;
  isEditing = false;
  selectedPlanId: number | null = null;

  constructor(
    private planService: IndustrializationPlanService,
    private fb: FormBuilder, private equipmentService: EquipmentService
  ) {
    this.planForm = this.fb.group({
      project: ['', Validators.required],
      customer_1: ['', Validators.required],
      derivative_1: [''],
      maxKapazitaetLinieFzgTag: [null, Validators.min(0)],
      phaseASample: [''],
      phaseBSample: [''],
      phaseCSample: [''],
      sop: [''],
      aSampleDate: [null],
      bSampleDate: [null],
      cSampleDate: [null],
      sopDate: [null],
      plant: [''],
      equipment: ['', Validators.required],
      qty: [null, [Validators.required, Validators.min(0)]],
      pricePerPiece: [null, [Validators.required, Validators.min(0)]],
      leadTimeWeeks: [null, [Validators.required, Validators.min(0)]],
      transportationTimeWeeks: [null, [Validators.required, Validators.min(0)]],
      installationTimeWeeks: [null, [Validators.required, Validators.min(0)]],
      targetDate: [null, Validators.required],
      projectPhase: [''],
      Comment: ['']
    });
  }

  ngOnInit(): void {
    this.loadPlans();
    this.fetchEquipment();  
  }

  fetchEquipment() {
    this.equipmentService.getAllEquipment().subscribe((data: Equipment[]) => {
        this.equipmentList = data;
    });
}

  loadPlans(): void {
    this.planService.getAllPlans().subscribe(
      (plans) => {
        this.plans = plans;
      },
      (error) => {
        console.error('Error loading plans:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.planForm.valid) {
      const planData = this.planForm.value;
      
      if (this.isEditing && this.selectedPlanId) {
        this.planService.updatePlan(this.selectedPlanId, planData).subscribe(
          (updatedPlan) => {
            this.loadPlans();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating plan:', error);
          }
        );
      } else {
        this.planService.createPlan(planData).subscribe(
          (newPlan) => {
            this.loadPlans();
            this.resetForm();
          },
          (error) => {
            console.error('Error creating plan:', error);
          }
        );
      }
    }
  }

  editPlan(plan: IndustrializationPlan): void {
    this.isEditing = true;
    this.selectedPlanId = plan.id!;
    this.planForm.patchValue(plan);
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedPlanId = null;
    this.planForm.reset();
  }
}