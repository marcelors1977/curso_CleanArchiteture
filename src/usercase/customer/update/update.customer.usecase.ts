import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./dto/update.customer.dto";
import MapperUseCaseUpdate from "./mapper/update.mapper";
export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {   
        const inputToCustomerInterface = new MapperUseCaseUpdate().convertToDomain(input);
        let customerToUpdate;

        if ( input.address === undefined ) {
            customerToUpdate = CustomerFactory.create(inputToCustomerInterface);
        }
        else {
            customerToUpdate = CustomerFactory.createWithAddress(inputToCustomerInterface);

            input.active !== undefined && input.active === true ? customerToUpdate.activate() : customerToUpdate.deactivate();
        }

        input.rewardPoints !== undefined && input.rewardPoints > 0 && customerToUpdate.addRewardPoints(input.rewardPoints);
     
        await this.customerRepository.update(customerToUpdate);

        const customer = await this.customerRepository.find(input.id);

        return new MapperUseCaseUpdate().convertToOutputUseCase(customer);
    }
}