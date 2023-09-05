import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./dto/list.customer.dto";
import MapperUserCaseList from "./mapper/list.mapper";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();

        return new MapperUserCaseList().convertToOutputUseCase(customers);
    }
}