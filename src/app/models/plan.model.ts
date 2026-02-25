export interface PlanFeature {
    text: string;
    included: boolean;
}

export interface Plan {
    name: string;
    icon: string;
    description: string;
    currency: string;
    price: number;
    priceFormatted: string;
    period: string;
    features: PlanFeature[];
    buttonText: string;
    buttonStyle: 'outline' | 'primary';
    popular: boolean;
}
