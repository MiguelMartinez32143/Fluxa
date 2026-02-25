import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';

@Injectable({
    providedIn: 'root',
})
export class PlansService {

    private formatOptions: Intl.NumberFormatOptions = {};
    private serviceId: string = '';

    constructor() {
    }

    getPlans(isAnnual: boolean): Plan[] {
        const plans = [
            {
                name: 'Básico',
                icon: 'bi bi-rocket',
                description: 'Para empezar a organizar tus finanzas',
                currency: '$',
                monthlyPrice: 0,
                features: [
                    { text: 'Hasta 50 transacciones/mes', included: true },
                    { text: '5 categorías personalizadas', included: true },
                    { text: '1 presupuesto activo', included: true },
                    { text: 'Reportes básicos', included: true },
                    { text: 'Soporte por email', included: true },
                    { text: 'Analytics avanzado', included: false },
                    { text: 'Exportar reportes', included: false },
                    { text: 'Soporte prioritario', included: false },
                ],
                buttonText: 'Comenzar Gratis',
                buttonStyle: 'outline' as const,
                popular: false,
            },
            {
                name: 'Pro',
                icon: 'bi bi-lightning-charge-fill',
                description: 'Lo mejor para uso personal avanzado',
                currency: '$',
                monthlyPrice: 35000,
                features: [
                    { text: 'Transacciones ilimitadas', included: true },
                    { text: 'Categorías ilimitadas', included: true },
                    { text: 'Presupuestos ilimitados', included: true },
                    { text: 'Analytics avanzado', included: true },
                    { text: 'Exportar PDF/Excel', included: true },
                    { text: 'Recordatorios inteligentes', included: true },
                    { text: 'Sin publicidad', included: true },
                    { text: 'Soporte prioritario', included: true },
                ],
                buttonText: 'Empezar Prueba 14 días',
                buttonStyle: 'primary' as const,
                popular: true,
            },
            {
                name: 'Familiar',
                icon: 'bi bi-people-fill',
                description: 'Finanzas compartidas para toda la familia',
                currency: '$',
                monthlyPrice: 90000,
                features: [
                    { text: 'Todo de Pro incluido', included: true },
                    { text: 'Hasta 5 usuarios', included: true },
                    { text: 'Presupuestos compartidos', included: true },
                    { text: 'Permisos granulares', included: true },
                    { text: 'Dashboard familiar', included: true },
                    { text: 'Soporte premium 24/7', included: true },
                    { text: 'Onboarding personalizado', included: true },
                    { text: 'API para integraciones', included: true },
                ],
                buttonText: 'Comenzar',
                buttonStyle: 'outline' as const,
                popular: false,
            },
        ];

        return plans.map(plan => {
            let finalPrice = plan.monthlyPrice;
            let period = '/mes';

            if (isAnnual && plan.monthlyPrice > 0) {
                // (Mensual * 12) * 0.8 (20% descuento)
                finalPrice = (plan.monthlyPrice * 12) * 0.8;
                period = '/año';
            }

            return {
                ...plan,
                price: finalPrice,
                priceFormatted: this.formatPrice(finalPrice),
                period: period
            };
        });
    }

    private formatPrice(price: number): string {
        return new Intl.NumberFormat('es-CO', this.formatOptions).format(price);
    }
}
