export interface InputUpdateCustomerDto {
    id: string;
    name: string;
    address?: {
        street: string;
        number: number;
        zip: string;
        city: string;
    },
    rewardPoints?: number;
    active?: boolean;
};

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    address?: {
        street: string;
        number: number;
        zip: string;
        city: string;
    },
    rewardPoints?: number;
    active?: boolean;
};