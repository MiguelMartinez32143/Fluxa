import { Component } from '@angular/core';
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
export class Plans {
  // Controla si los planes están visibles o no
  showPlans = false;

  // Controla si la facturación es anual o mensual
  isAnnual = false;

  // Array que almacena los planes cargados desde el servicio
  plans: Plan[] = [];

  // Inyección de dependencias por constructor:
  // Angular detecta que PlansService está decorado con @Injectable({ providedIn: 'root' })
  // y automáticamente inyecta la instancia singleton del servicio aquí.
  // 'private' hace que plansService sea una propiedad accesible en toda la clase.
  constructor(private plansService: PlansService) { }

  // Muestra u oculta los planes. Al mostrarlos, los carga desde el servicio inyectado.
  togglePlans(): void {
    this.showPlans = !this.showPlans;

    // Solo carga los planes cuando se van a mostrar
    if (this.showPlans) {
      this.loadPlans();
    }
  }

  // Cambia entre facturación mensual y anual, luego recarga los planes
  toggleBilling(value?: boolean): void {
    this.isAnnual = value !== undefined ? value : !this.isAnnual;
    this.loadPlans();
  }

  // Usa el servicio inyectado (this.plansService) para obtener los planes.
  // Esto es posible gracias a la inyección por constructor.
  private loadPlans(): void {
    this.plans = this.plansService.getPlans(this.isAnnual);
  }
}
