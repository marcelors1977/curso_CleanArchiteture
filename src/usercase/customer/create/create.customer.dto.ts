export interface InputCreateCustomerDto { 
    id: string;
    name: string;
    address?: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
    active?: boolean;
}

export interface OutputCreateCustomerDto {
    id: string;
    name: string;
    address?: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
    rewardPoints?: number;
    active?: boolean;
}