import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./dto/create.customer.dto";
import MapperUseCaseCreate from "./mapper/create.mapper";


export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const inputToCustomerInterface = new MapperUseCaseCreate().convertToDomain(input);
        let customer;

        if ( input.address === undefined ) {
            customer = CustomerFactory.create(inputToCustomerInterface);
        }
        else {
            customer = CustomerFactory.createWithAddress(inputToCustomerInterface);
            input.active !== undefined && input.active === true ? customer.activate() : customer.deactivate();
        }

      
        await this.customerRepository.create(customer);
        
        const output = await this.customerRepository.find(customer.id);

        return new MapperUseCaseCreate().convertToOutputUseCase(output);
    }
}