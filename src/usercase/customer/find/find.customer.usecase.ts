import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import FindOutputMapper from "./find.output.mapper";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        return new FindOutputMapper().convertTo(customer);
    }
}