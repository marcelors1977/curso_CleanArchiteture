import CustomerInterface from "../../../../domain/customer/entity/customer.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "../dto/find.customer.dto";

export default class MapperUseCaseFind implements MapperUseCaseInterface {
    convertToOutputUseCase(data: CustomerInterface): OutputFindCustomerDto {
        const output: OutputFindCustomerDto = {
            id: data.id,
            name: data.name,
            ...(
                data.address && {
                    address: {
                        street: data.address.street,
                        number: data.address.number,
                        zip: data.address.zipcode,
                        city: data.address.city
                    }
                }
            ),
            rewardPoints: data.rewardPoints ? data.rewardPoints : 0,
            active: data.isActive() ? data.isActive() : false
        }

        return output;
    }
    
    convertToDomain(input: InputFindCustomerDto): any {
        return {
            id: input.id
        }
    }
}