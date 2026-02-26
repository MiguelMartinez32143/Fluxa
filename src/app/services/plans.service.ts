import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';

// @Injectable marca esta clase como un servicio que puede ser inyectado
// en otros componentes o servicios a través de su constructor.
// providedIn: 'root' registra el servicio como singleton a nivel global,
// lo que significa que Angular crea UNA sola instancia compartida.
@Injectable({
    providedIn: 'root',
})
export class PlansService {

    // Opciones de formato numérico para Intl.NumberFormat
    // Se inicializan en el constructor con el estilo de moneda colombiana
    private formatOptions: Intl.NumberFormatOptions = {};

    // Identificador único de la instancia del servicio (para logging o tracking)
    // Se genera automáticamente en el constructor
    private serviceId: string = '';

    // El constructor se ejecuta UNA sola vez cuando Angular crea la instancia del servicio.
    // Como tiene providedIn: 'root', esto ocurre la primera vez que algún componente
    // lo inyecta en su constructor (ej: constructor(private plansService: PlansService)).
    // Aquí inicializamos las propiedades del servicio con sus valores reales.
    constructor() {
        // Configuramos las opciones de formato para mostrar precios en Pesos Colombianos
        this.formatOptions = {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        };

        // Generamos un ID único para esta instancia del servicio
        // Útil para rastrear logs o depurar si hay múltiples instancias
        this.serviceId = this.generateId();
        console.log(`[PlansService] Servicio inicializado con ID: ${this.serviceId}`);
    }

    // Retorna la lista de planes con precios calculados según el tipo de facturación
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

    // Formatea un precio usando Intl.NumberFormat con locale colombiano
    private formatPrice(price: number): string {
        return new Intl.NumberFormat('es-CO', this.formatOptions).format(price);
    }

    // Genera un identificador único corto para la instancia del servicio
    private generateId(): string {
        return Math.random().toString(36).substring(2, 10);
    }
}
