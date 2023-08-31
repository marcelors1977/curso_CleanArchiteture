import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import ListOutputMapper from "./list.output.mapper";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();

        return new ListOutputMapper().convertTo(customers);
    }
}