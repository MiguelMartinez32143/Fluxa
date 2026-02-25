import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansService } from '../../services/plans.service';
import { Plan } from '../../models/plan.model';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit {
  isAnnual = false;
  plans: Plan[] = [];

  constructor(private plansService: PlansService) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  toggleBilling(value?: boolean): void {
    this.isAnnual = value !== undefined ? value : !this.isAnnual;
    this.loadPlans();
  }

  private loadPlans(): void {
    this.plans = this.plansService.getPlans(this.isAnnual);
  }
}
