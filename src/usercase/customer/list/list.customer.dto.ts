export interface InputListCustomerDto {}

interface CustomerDto {
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

export interface OutputListCustomerDto {
    customers: CustomerDto[];
}